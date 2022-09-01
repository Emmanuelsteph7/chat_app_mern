import { AxiosConfig } from 'config/axiosConfig';

const config = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
};

export interface SendMessagePayload {
  content: string;
  chatId: string;
}

export const getMessagesService = async (token: string, chatId: string) => {
  return await AxiosConfig.get(`/api/message/${chatId}`, config(token));
};

export const sendMessageService = async (token: string, payload: SendMessagePayload) => {
  return await AxiosConfig.post(`/api/message`, payload, config(token));
};
