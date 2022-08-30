import { NextFunction, Response, Request } from 'express';
import catchAsyncErrors from '@src/middleware/catchAsyncErrors';
import { comparePassword, ErrorHandler, generateToken } from '@src/utils';
import UserModel from '@src/models/User';
import bcrypt from 'bcryptjs';
import { ExtendedRequest } from '@src/types';

// eslint-disable-next-line consistent-return
const registerUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, picture } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler('Please enter all fields', 400));
  }

  try {
    const previousUser = await UserModel.findOne({ email });

    if (previousUser) {
      return next(new ErrorHandler('User already exists', 500));
    }

    const encryptedPwd = await bcrypt.hash(password, 10);

    const user = await UserModel.create({
      name,
      email,
      password: encryptedPwd,
      picture,
    });

    res.status(201).json({
      success: true,
      // eslint-disable-next-line no-underscore-dangle
      data: { id: user._id, name: user.name, email: user.email, picture: user.picture, token: generateToken(user._id) },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const loginUser = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  try {
    // eslint-disable-next-line no-underscore-dangle
    const user = await UserModel.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorHandler('User does not exist', 400));
    }

    const isPasswordMatched = await comparePassword(password, user.password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler('Invalid credentials', 400));
    }

    res.status(200).json({
      success: true,
      // eslint-disable-next-line no-underscore-dangle
      data: { name: user.name, email: user.email, picture: user.picture, token: generateToken(user._id) },
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// eslint-disable-next-line consistent-return
const getAllUsers = catchAsyncErrors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const keyword = req.query?.search
    ? {
        $or: [
          { name: { $regex: req.query?.search, $options: 'i' } },
          { email: { $regex: req.query?.search, $options: 'i' } },
        ],
      }
    : {};

  try {
    // eslint-disable-next-line no-underscore-dangle
    const users = await UserModel.find(keyword).find({ _id: { $ne: req.user.id } });

    res.status(200).json({
      success: true,
      data: users,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export { registerUser, loginUser, getAllUsers };
