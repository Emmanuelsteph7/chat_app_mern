import { ErrorHandler } from '@src/utils';
import { Request, Response, NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  next(new ErrorHandler(`Not found - ${req.originalUrl}`, 404));
};

export default notFound;
