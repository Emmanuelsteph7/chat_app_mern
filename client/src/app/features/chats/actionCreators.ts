import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  AddUserToGroupPayload,
  addUserToGroupService,
  CreateGroupChatPayload,
  createGroupChatService,
  getChatsService,
  getSelectedChatService,
  RemoveUserFromGroupPayload,
  removeUserFromGroupService,
  RenameGroupPayload,
  renameGroupService
} from 'services/chat';
import { ChatI } from 'types/client';

interface StaticOptions {
  successAlert: AlertI;
  errorAlert: AlertI;
}

type AlertI = ({ message, title }: { message: string; title?: string | undefined }) => void;

interface GetSelectedChatOptions extends StaticOptions {
  payload: {
    userId: string;
    token: string;
    closeNav: () => void;
  };
}

interface GetChatsOptions extends StaticOptions {
  payload: {
    token: string;
  };
}

interface CreateGroupChatOptions extends StaticOptions {
  payload: {
    token: string;
    data: CreateGroupChatPayload;
    otherFunc: () => void;
  };
}

interface RenameGroupOptions extends StaticOptions {
  payload: {
    token: string;
    data: RenameGroupPayload;
    otherFunc?: () => void;
  };
}

interface AddUserToGroupOptions extends StaticOptions {
  payload: {
    token: string;
    data: AddUserToGroupPayload;
    otherFunc?: () => void;
  };
}

interface RemoveUserFromGroupOptions extends StaticOptions {
  payload: {
    token: string;
    data: RemoveUserFromGroupPayload;
    otherFunc?: () => void;
  };
}

export const getSelectedChat = createAsyncThunk(
  'chat/getSelectedChat',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: GetSelectedChatOptions, { rejectWithValue }) => {
    try {
      const res = await getSelectedChatService(payload.token, { userId: payload.userId });

      payload.closeNav();
      return res.data?.data[0] as ChatI;
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

export const getChats = createAsyncThunk(
  'chat/getChats',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: GetChatsOptions, { rejectWithValue }) => {
    try {
      const res = await getChatsService(payload.token);

      return res.data?.data as ChatI[];
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

export const createGroupChat = createAsyncThunk(
  'chat/createGroupChat',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: CreateGroupChatOptions, { rejectWithValue }) => {
    try {
      const res = await createGroupChatService(payload.token, payload.data);

      if (res.data?.data) {
        successAlert({
          message: 'Group created',
          title: 'Success'
        });

        payload.otherFunc();
      }

      return res.data?.data as ChatI;
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

export const renameGroup = createAsyncThunk(
  'chat/renameGroup',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: RenameGroupOptions, { rejectWithValue }) => {
    try {
      const res = await renameGroupService(payload.token, payload.data);

      if (res.data?.data) {
        successAlert({
          message: 'Group created',
          title: 'Success'
        });

        if (payload.otherFunc) {
          payload?.otherFunc();
        }
      }

      return res.data?.data as ChatI;
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

export const addUserToGroup = createAsyncThunk(
  'chat/addUserToGroup',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async ({ payload, successAlert, errorAlert }: AddUserToGroupOptions, { rejectWithValue }) => {
    try {
      const res = await addUserToGroupService(payload.token, payload.data);

      if (res.data?.data) {
        successAlert({
          message: 'User Added',
          title: 'Success'
        });

        if (payload.otherFunc) {
          payload?.otherFunc();
        }
      }

      return res.data?.data as ChatI;
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

export const removeUserFromGroup = createAsyncThunk(
  'chat/removeUserFromGroup',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (
    { payload, successAlert, errorAlert }: RemoveUserFromGroupOptions,
    { rejectWithValue }
  ) => {
    try {
      const res = await removeUserFromGroupService(payload.token, payload.data);

      if (res.data?.data) {
        successAlert({
          message: 'User Removed',
          title: 'Success'
        });

        if (payload.otherFunc) {
          payload?.otherFunc();
        }
      }

      return res.data?.data as ChatI;
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
