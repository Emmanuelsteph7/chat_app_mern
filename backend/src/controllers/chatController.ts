import { NextFunction, Response, Request } from 'express';
import catchAsyncErors from '@src/middleware/catchAsyncErrors';
import { ErrorHandler } from '@src/utils';
import { ChatModel } from '@src/models';
import { ExtendedRequest } from '@src/types';
import UserModel, { UserI } from '@src/models/User';

// eslint-disable-next-line consistent-return
const getChats = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  try {
    // eslint-disable-next-line no-underscore-dangle
    const chats = await ChatModel.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate('users', '-password')
      .populate('groupAdmin', '-password')
      .populate('latestMessage')
      .sort({ updatedAt: -1 }); // from newest to oldest

    const fullChats = await UserModel.populate(chats, {
      path: 'latestMessage.sender',
      select: 'name email picture',
    });

    res.status(200).json({
      success: true,
      data: fullChats,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const getSingleChat = catchAsyncErors(async (req: Request, res: Response, next: NextFunction) => {
  // const { id } = req.params;
  try {
    // eslint-disable-next-line no-underscore-dangle
    // const chat = chats.find(item => item._id === id);
    // res.send(chat);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const getOneOnOneChat = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  // this is the id of the user that the logged in user is chatting with
  const { userId } = req.query;

  if (!userId) {
    return next(new ErrorHandler('userId not sent with the request', 400));
  }

  try {
    // check for singleChat, i.e, groupChat = false, and check the users array in the chat model to see the chat that both ids exists in
    // after getting the chat object, populate the users and latestMessage fields with its full info
    const isChat = await ChatModel.find({
      isGroupChat: false,
      $and: [{ users: { $elemMatch: { $eq: req.user.id } } }, { users: { $elemMatch: { $eq: userId } } }],
    })
      .populate('users', '-password')
      .populate('latestMessage');

    const isChatData = await UserModel.populate(isChat, {
      path: 'latestMessage.sender',
      select: 'name email picture',
    });

    if (isChatData.length > 0) {
      res.status(200).json({
        success: true,
        data: isChatData,
      });
    } else {
      const chatData = {
        chatName: 'sender',
        isGroupChat: false,
        // eslint-disable-next-line no-underscore-dangle
        users: [req.user._id, userId],
      };

      const createdChat = await ChatModel.create(chatData);

      // eslint-disable-next-line no-underscore-dangle
      const fullChat = await ChatModel.find({ _id: createdChat._id }).populate('users', '-password');

      res.status(200).json({
        success: true,
        data: fullChat,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const createGroupChat = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { name, users } = req.body;

  if (!name || !users) {
    return next(new ErrorHandler('Please fill all fields', 400));
  }

  // the users from the client side will be a stringified array
  const parsedUsers: UserI[] = JSON.parse(users);

  if (parsedUsers.length < 2) {
    return next(new ErrorHandler('More than 2 users are required to orm a group chat', 400));
  }

  parsedUsers.push(req.user);

  try {
    const groupChat = await ChatModel.create({
      isGroupChat: true,
      chatName: name,
      users: parsedUsers,
      groupAdmin: req.user,
    });

    // eslint-disable-next-line no-underscore-dangle
    const fullGroupChat = await ChatModel.findOne({ _id: groupChat._id })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    res.status(200).json({
      success: true,
      data: fullGroupChat,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const renameGroup = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { name, chatId } = req.body;

  try {
    const updatedChat = await ChatModel.findByIdAndUpdate(chatId, { chatName: name }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    if (!updatedChat) {
      next(new ErrorHandler('Chat not found', 404));
    }

    res.status(200).json({
      success: true,
      data: updatedChat,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const addUserToGroup = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { userId, chatId } = req.body;

  try {
    const addedUserUpdate = await ChatModel.findByIdAndUpdate(chatId, { $push: { users: userId } }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    if (!addedUserUpdate) {
      next(new ErrorHandler('Chat not found', 404));
    }

    res.status(200).json({
      success: true,
      data: addedUserUpdate,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const removeUserFromGroup = catchAsyncErors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { userId, chatId } = req.body;

  try {
    const removedUserUpdate = await ChatModel.findByIdAndUpdate(chatId, { $pull: { users: userId } }, { new: true })
      .populate('users', '-password')
      .populate('groupAdmin', '-password');

    if (!removedUserUpdate) {
      next(new ErrorHandler('Chat not found', 404));
    }

    res.status(200).json({
      success: true,
      data: removedUserUpdate,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export { getChats, getSingleChat, getOneOnOneChat, createGroupChat, renameGroup, addUserToGroup, removeUserFromGroup };
