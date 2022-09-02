import { createSlice } from '@reduxjs/toolkit';
import { MessageI } from 'types/client';
import { getMessages, sendMessage } from './actionCreators';

interface StaticState {
  loading: boolean;
  error: string | null;
}

interface NotificationI {
  data: MessageI[] | null;
}

interface NotificationState {
  data: MessageI[] | null;
  //   data: NotificationI;
}

const initialState: NotificationState = {
  data: []
};

const handleAppendNotification = (message: MessageI, messages: MessageI[] | null) => {
  if (!messages) {
    return [message];
  } else {
    const messageIndex = messages.findIndex((item) => item._id === message._id);

    if (messageIndex > -1) {
      return [...messages];
    }
    return [...messages, message];
  }
};

const handleRemoveNotification = (message: MessageI, messages: MessageI[] | null) => {
  if (!messages) {
    return [];
  } else {
    const messageIndex = messages.findIndex((item) => item._id === message._id);

    if (messageIndex > -1) {
      messages.splice(messageIndex, 1);
      return [...messages];
    }
    return [...messages];
  }
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification: (state, actions) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.data = handleAppendNotification(actions.payload, state.data!);
    },
    removeNotification: (state, actions) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      state.data = handleRemoveNotification(actions.payload, state.data!);
    }
  }
});

export const { addNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
