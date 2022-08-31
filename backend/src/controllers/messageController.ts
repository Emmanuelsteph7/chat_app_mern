import { NextFunction, Response } from 'express';
import catchAsyncErors from '@src/middleware/catchAsyncErrors';
import { ErrorHandler } from '@src/utils';
import { ExtendedRequest } from '@src/types';
import MessageModel from '@src/models/Message';
import UserModel from '@src/models/User';
import { ChatModel } from '@src/models';

// eslint-disable-next-line consistent-return
const getMessages = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const messages = await MessageModel.find({ chat: id }).populate('sender', 'name picture email').populate('chat');

    res.status(200).json({
      success: true,
      data: messages,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const sendMessage = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return next(new ErrorHandler('Invalid data passed', 400));
  }

  try {
    let message = await MessageModel.create({
      // eslint-disable-next-line no-underscore-dangle
      sender: req.user._id,
      content,
      chat: chatId,
    });

    message = await message.populate('sender', 'name picture'); // populate the sender in the message
    message = await message.populate('chat'); // populate the chat in the message
    const messageUpdate = await UserModel.populate(message, {
      path: 'chat.users',
      select: 'name picture email',
    }); // populate the users inside the chat object in the message

    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: messageUpdate,
    });

    res.status(200).json({
      success: true,
      data: messageUpdate,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export { getMessages, sendMessage };
