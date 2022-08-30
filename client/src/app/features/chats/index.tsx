import { createSlice } from '@reduxjs/toolkit';
import { ChatI } from 'types/client';
import { createGroupChat, getChats, getSelectedChat, renameGroup } from './actionCreators';

interface StaticState {
  loading: boolean;
  error: string | null;
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

const handleChatReplace = (chat: ChatI, chatArray: ChatI[]) => {
  const chatIndex = chatArray.findIndex((item) => item._id === chat._id);

  if (chatIndex > -1) {
    chatArray.splice(chatIndex, 1, chat);
    return chatArray;
  } else {
    return [chat, ...chatArray];
  }
};

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
    builders.addCase(renameGroup.pending, (state) => {
      state.groupChat.loading = true;
    });
    builders.addCase(renameGroup.fulfilled, (state, actions) => {
      state.groupChat.loading = false;
      state.groupChat.error = null;
      state.groupChat.data = actions.payload;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.allChats.data = handleChatReplace(actions.payload, state.allChats.data!);
      // state.allChats.data = [actions.payload, ...state.allChats.data!];
    });
    builders.addCase(renameGroup.rejected, (state, actions) => {
      state.groupChat.loading = false;
      state.groupChat.error = (actions.payload as string) || 'Error fetching chats';
      state.groupChat.data = null;
    });
  }
});

export const { setSelectedChat, updateAllChats } = chatSlice.actions;

export default chatSlice.reducer;
