import { useSocket } from 'hooks';
import React from 'react';
import { Header, MainChat, MyChats } from './components';

const Chats = () => {
  useSocket();
  return (
    <div className="flex justify-between items-center gap-5 bg-primary h-screen p-4 pt-20">
      <Header />
      <aside className="w-4/12 max-w-500 bg-white rounded shadow relative h-full p-3">
        <MyChats />
      </aside>
      <main className="flex-1 bg-white rounded shadow h-full">
        <MainChat />
      </main>
    </div>
  );
};

export default Chats;
