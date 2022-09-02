import { Request } from 'express';

export interface ExtendedRequest extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
}

export interface UserI {
  _id: string;
  name: string;
  email: string;
  token?: string;
  picture: string;
}

export interface ChatI {
  chatName: string;
  isGroupChat: boolean;
  users: UserI[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  latestMessage: any;
  groupAdmin: UserI | null;
  _id: string;
}

export interface MessageI {
  sender: UserI;
  content: string;
  chat: ChatI;
  _id: string;
}
