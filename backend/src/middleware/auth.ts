import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import UserModel from '@src/models/User';
import { ExtendedRequest } from '@src/types';
import { ErrorHandler } from '@src/utils';
import catchAsyncErrors from './catchAsyncErrors';

// Check if user is authenticated or not
// then, stores the user in req.user
// export const isAuthenticatedCookies = catchAsyncErrors(async (req: Request, res: Response, next: NextFunction) => {
//   const { token } = req.cookies;

//   if (!token) {
//     return next(new ErrorHandler('Login to access this resource', 401));
//   }

//   const decoded = jwt.verify(token, process.env.JWT_SECRET);
//   req.user = await UserModel.findById(decoded.id);

//   next();
// });

// Check if user is authenticated or not
// then, stores the user in req.user
// eslint-disable-next-line consistent-return
export const isAuthenticated = catchAsyncErrors(async (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  let token;

  if (authorization) {
    // eslint-disable-next-line prefer-destructuring
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next(new ErrorHandler('Login to access this resource', 401));
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let decoded: any;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET || '');
  } catch (error) {
    return next(new ErrorHandler('jwt expired', 401));
  }

  try {
    const user = await UserModel.findById(decoded.id);

    if (user) {
      req.user = user;
      next();
    } else {
      return next(new ErrorHandler('User not found', 400));
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// Handling user roles
// This middleware is used to restrict access based on roles => user or admin
// export const authorizeRoles = (...roles) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!roles.includes(req.user.role)) {
//       return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
//     }

//     next();
//   };
// };
