import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  CreateGroupChatPayload,
  createGroupChatService,
  getChatsService,
  getSelectedChatService
} from 'services/chat';
import { ChatI } from 'types/client';

interface StaticState {
  loading: boolean;
  error: string | null;
}

interface StaticOptions {
  successAlert: AlertI;
  errorAlert: AlertI;
}

interface SelectedChatI extends StaticState {
  data: ChatI | null;
}

interface AllChatsI extends StaticState {
  data: ChatI[] | null;
}

interface GroupChatI extends StaticState {
  data: ChatI | null;
}

interface ChatState {
  selectedChat: SelectedChatI;
  allChats: AllChatsI;
  groupChat: GroupChatI;
}

const initialState: ChatState = {
  selectedChat: {
    loading: false,
    error: null,
    data: null
  },
  allChats: {
    loading: false,
    error: null,
    data: null
  },
  groupChat: {
    loading: false,
    error: null,
    data: null
  }
};

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

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setSelectedChat: (state, actions) => {
      state.selectedChat.loading = false;
      state.selectedChat.error = null;
      state.selectedChat.data = actions.payload;
    },
    updateAllChats: (state, actions) => {
      state.allChats.loading = false;
      state.allChats.error = null;
      state.allChats.data = actions.payload;
    }
  },
  extraReducers: (builders) => {
    builders.addCase(getSelectedChat.pending, (state) => {
      state.selectedChat.loading = true;
    });
    builders.addCase(getSelectedChat.fulfilled, (state, actions) => {
      state.selectedChat.loading = false;
      state.selectedChat.error = null;
      state.selectedChat.data = actions.payload;
    });
    builders.addCase(getSelectedChat.rejected, (state, actions) => {
      state.selectedChat.loading = false;
      state.selectedChat.error = (actions.payload as string) || 'Error fetching chat';
      state.selectedChat.data = null;
    });
    builders.addCase(getChats.pending, (state) => {
      state.allChats.loading = true;
    });
    builders.addCase(getChats.fulfilled, (state, actions) => {
      state.allChats.loading = false;
      state.allChats.error = null;
      state.allChats.data = actions.payload;
    });
    builders.addCase(getChats.rejected, (state, actions) => {
      state.allChats.loading = false;
      state.allChats.error = (actions.payload as string) || 'Error fetching chats';
      state.allChats.data = null;
    });
    builders.addCase(createGroupChat.pending, (state) => {
      state.groupChat.loading = true;
    });
    builders.addCase(createGroupChat.fulfilled, (state, actions) => {
      state.groupChat.loading = false;
      state.groupChat.error = null;
      state.groupChat.data = actions.payload;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.allChats.data = [actions.payload, ...state.allChats.data!];
    });
    builders.addCase(createGroupChat.rejected, (state, actions) => {
      state.groupChat.loading = false;
      state.groupChat.error = (actions.payload as string) || 'Error fetching chats';
      state.groupChat.data = null;
    });
  }
});

export const { setSelectedChat, updateAllChats } = chatSlice.actions;

export default chatSlice.reducer;
