import { createSlice } from '@reduxjs/toolkit';
import { MessageI } from 'types/client';
import { getMessages, sendMessage } from './actionCreators';

interface StaticState {
  loading: boolean;
  error: string | null;
}

interface MessagesI extends StaticState {
  data: MessageI[] | null;
}

interface MessageState {
  messages: MessagesI;
}

const initialState: MessageState = {
  messages: {
    loading: false,
    error: null,
    data: null
  }
};

const handleAppendMessage = (message: MessageI, messages: MessageI[] | null) => {
  if (!messages) {
    return [message];
  } else {
    return [...messages, message];
  }
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: (builders) => {
    builders.addCase(getMessages.pending, (state) => {
      state.messages.loading = true;
    });
    builders.addCase(getMessages.fulfilled, (state, actions) => {
      state.messages.loading = false;
      state.messages.error = null;
      state.messages.data = actions.payload;
    });
    builders.addCase(getMessages.rejected, (state, actions) => {
      state.messages.loading = false;
      state.messages.error = (actions.payload as string) || 'Error fetching chat';
      state.messages.data = null;
    });
    builders.addCase(sendMessage.pending, (state) => {
      state.messages.loading = true;
    });
    builders.addCase(sendMessage.fulfilled, (state, actions) => {
      state.messages.loading = false;
      state.messages.error = null;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.messages.data = handleAppendMessage(actions.payload, state.messages.data!);
    });
    builders.addCase(sendMessage.rejected, (state, actions) => {
      state.messages.loading = false;
      state.messages.error = (actions.payload as string) || 'Error fetching chat';
      state.messages.data = null;
    });
  }
});

// export const {} = messageSlice.actions;

export default messageSlice.reducer;
