import { setSelectedChat } from 'app/index';
import { RootState, useAppDispatch } from 'app/store';
import { Text } from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatI } from 'types/client';
import cs from 'classnames';
import { getSender } from 'utils';

interface Props {
  chat: ChatI;
}

const ChatUserBox: React.FC<Props> = ({ chat }) => {
  const [isSelectedChat, setIsSelectedChat] = useState(false);
  const dispatch = useAppDispatch();

  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat.data);
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    if (selectedChat?._id === chat._id) {
      setIsSelectedChat(true);
    } else {
      setIsSelectedChat(false);
    }
  }, [selectedChat]);

  const handleSetSelectedChat = () => {
    dispatch(setSelectedChat(chat));
  };

  const classes = cs('p-2 rounded mb-2 cursor-pointer', {
    'bg-primary text-white': isSelectedChat,
    'bg-white text-primary': !isSelectedChat
  });
  return (
    <div className={classes} onClick={handleSetSelectedChat}>
      <Text className="mb-2">{chat.isGroupChat ? chat.chatName : getSender(user, chat.users)}</Text>
      {/* <Text>
        <strong>{smallName}</strong>: <span>{message}</span>
      </Text> */}
    </div>
  );
};

export default ChatUserBox;
