import { Request } from 'express';

export interface ExtendedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}
