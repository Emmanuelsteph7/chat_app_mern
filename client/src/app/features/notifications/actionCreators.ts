import { createAsyncThunk } from '@reduxjs/toolkit';
import { getMessagesService, SendMessagePayload, sendMessageService } from 'services/messages';
import { MessageI } from 'types/client';

interface StaticOptions {
  successAlert: AlertI;
  errorAlert: AlertI;
}

type AlertI = ({ message, title }: { message: string; title?: string | undefined }) => void;

interface GetMessagesOptions extends StaticOptions {
  payload: {
    chatId: string;
    token: string;
    otherFunc?: () => void;
  };
}

interface SendMessageOptions extends StaticOptions {
  payload: {
    data: SendMessagePayload;
    token: string;
    otherFunc?: (message?: MessageI) => void;
  };
}

export const getMessages = createAsyncThunk(
  'message/getMessages',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: GetMessagesOptions, { rejectWithValue }) => {
    try {
      const res = await getMessagesService(payload.token, payload.chatId);

      if (res.data?.data) {
        if (payload.otherFunc) {
          payload.otherFunc();
        }
      }
      return res.data?.data as MessageI[];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      errorAlert({
        message: error?.response?.data?.errMessage,
        title: 'Error'
      });
      return rejectWithValue(error?.response?.data?.errMessage);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: SendMessageOptions, { rejectWithValue }) => {
    try {
      const res = await sendMessageService(payload.token, payload.data);

      if (res.data?.data) {
        if (payload.otherFunc) {
          payload.otherFunc(res.data?.data);
        }
      }
      return res.data?.data as MessageI;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      errorAlert({
        message: error?.response?.data?.errMessage,
        title: 'Error'
      });
      return rejectWithValue(error?.response?.data?.errMessage);
    }
  }
);
