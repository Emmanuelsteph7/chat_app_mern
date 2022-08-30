import { AxiosConfig } from 'config/axiosConfig';
import { UserI } from 'types/client';

const config = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
};

export interface GetSelectedChatPayload {
  userId: string;
}

export interface CreateGroupChatPayload {
  name: string;
  users: string;
}

export const getSelectedChatService = async (token: string, payload: GetSelectedChatPayload) => {
  return await AxiosConfig.get(`/api/chat/getOneOnOneChat?userId=${payload.userId}`, config(token));
};

export const getChatsService = async (token: string) => {
  return await AxiosConfig.get(`/api/chat`, config(token));
};

export const createGroupChatService = async (token: string, payload: CreateGroupChatPayload) => {
  return await AxiosConfig.post(`/api/chat/createGroupChat`, payload, config(token));
};
