import { RootState } from 'app/store';
import React from 'react';
import { useSelector } from 'react-redux';
import ChatScreen from './ChatScreen';
import EmptyChatScreen from './EmptyChatScreen';

const MainChat = () => {
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);
  return (
    <div className="flex flex-col justify-between h-full p-3 pt-5 gap-9">
      {selectedChat.data ? <ChatScreen data={selectedChat.data} /> : <EmptyChatScreen />}
    </div>
  );
};

export default MainChat;
