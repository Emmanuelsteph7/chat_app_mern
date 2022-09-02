import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { EventsObj, MessageI } from 'types/client';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'app/store';
import { addMessage, addNotification } from 'app/index';

const SOCKET_ENDPOINT = 'http://localhost:5000';

const socket = io(SOCKET_ENDPOINT);

const useSocket = () => {
  const [isSocketConnected, setIsSocketConnect] = useState(false);

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat.data);

  useEffect(() => {
    socket.emit(EventsObj.Setup, user);
    socket.on(EventsObj.Connected, () => {
      setIsSocketConnect(true);
    });
  }, []);

  useEffect(() => {
    socket.on(EventsObj.MessageReceived, (message: MessageI) => {
      if (!selectedChat || selectedChat._id !== message.chat._id) {
        // give notification
        dispatch(addNotification(message));
      } else {
        dispatch(addMessage(message));
      }
    });
  }, []);

  return { socket, isSocketConnected };
};

export default useSocket;
