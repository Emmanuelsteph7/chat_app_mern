import { AxiosConfig } from 'config/axiosConfig';

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

export interface RenameGroupPayload {
  name: string;
  chatId: string;
}

export interface AddUserToGroupPayload {
  userId: string;
  chatId: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface RemoveUserFromGroupPayload extends AddUserToGroupPayload {}

export const getSelectedChatService = async (token: string, payload: GetSelectedChatPayload) => {
  return await AxiosConfig.get(`/api/chat/getOneOnOneChat?userId=${payload.userId}`, config(token));
};

export const getChatsService = async (token: string) => {
  return await AxiosConfig.get(`/api/chat`, config(token));
};

export const createGroupChatService = async (token: string, payload: CreateGroupChatPayload) => {
  return await AxiosConfig.post(`/api/chat/createGroupChat`, payload, config(token));
};

export const renameGroupService = async (token: string, payload: RenameGroupPayload) => {
  return await AxiosConfig.put(`/api/chat/renameGroup`, payload, config(token));
};

export const addUserToGroupService = async (token: string, payload: AddUserToGroupPayload) => {
  return await AxiosConfig.put(`/api/chat/addUserToGroup`, payload, config(token));
};

export const removeUserFromGroupService = async (
  token: string,
  payload: RemoveUserFromGroupPayload
) => {
  return await AxiosConfig.put(`/api/chat/removeUserFromGroup`, payload, config(token));
};
