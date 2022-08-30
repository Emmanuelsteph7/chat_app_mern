import { UserI } from 'types/client';

export const getSender = (loggedInUser: UserI | null | undefined, users: UserI[]) => {
  const senderName = loggedInUser?._id === users[0]._id ? users[1].name : users[0].name;

  return senderName;
};

export const getSenderFull = (loggedInUser: UserI | null | undefined, users: UserI[]) => {
  const senderName = loggedInUser?._id === users[0]._id ? users[1] : users[0];

  return senderName;
};
