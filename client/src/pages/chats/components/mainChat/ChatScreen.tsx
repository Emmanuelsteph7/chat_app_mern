import { getMessages, sendMessage } from 'app/index';
import { RootState, useAppDispatch } from 'app/store';
import { Button, FormField, ProfileModal, Text, useErrorAlert, useSuccessAlert } from 'components';
import React, { useEffect, useState } from 'react';
import { CgEye } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { ChatI, EventsObj, MessageI } from 'types/client';
import { getSender } from 'utils';
import { getSenderFull } from 'utils/getSender';
import MessageBox from './MessageBox';
import UpdateGroupModal from './UpdateGroupModal';
import ScrollableFeed from 'react-scrollable-feed';
import { useSocket } from 'hooks';
import { typingGif } from 'assets';

interface Props {
  data: ChatI | null;
}

const ChatScreen: React.FC<Props> = ({ data }) => {
  const [isProfileShown, setIsProfileShown] = useState(false);
  const [isGroupUpdateShown, setIsGroupUpdateShown] = useState(false);
  const [message, setMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.user?.token);
  const messages = useSelector((state: RootState) => state.message.messages);

  const successAlert = useSuccessAlert();
  const errorAlert = useErrorAlert();
  const { socket, isSocketConnected } = useSocket();

  const handleOpenProfile = () => setIsProfileShown(true);
  const handleCloseProfile = () => setIsProfileShown(false);

  const handleOpenGroupUpdate = () => setIsGroupUpdateShown(true);
  const handleCloseGroupUpdate = () => setIsGroupUpdateShown(false);

  useEffect(() => {
    handleGetMessage();
  }, [data?._id]);

  useEffect(() => {
    socket.on(EventsObj.Typing, () => setIsTyping(true));
    socket.on(EventsObj.StopTyping, () => setIsTyping(false));
  }, []);

  const handleOpen = () => {
    if (data?.isGroupChat) {
      handleOpenGroupUpdate();
    } else {
      handleOpenProfile();
    }
  };

  const onSendSuccess = (message?: MessageI) => {
    setMessage('');
    socket.emit(EventsObj.NewMessage, message);
  };

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    socket.emit(EventsObj.StopTyping, data?._id);

    dispatch(
      sendMessage({
        successAlert,
        errorAlert,
        payload: {
          data: {
            content: message,
            chatId: data?._id || ''
          },
          token: token || '',
          otherFunc: onSendSuccess
        }
      })
    );
  };

  const onGetMessageSuccess = () => {
    socket.emit(EventsObj.JoinRoom, data?._id);
  };

  const handleGetMessage = () => {
    dispatch(
      getMessages({
        successAlert,
        errorAlert,
        payload: {
          chatId: data?._id || '',
          token: token || '',
          otherFunc: onGetMessageSuccess
        }
      })
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);

    if (!isSocketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit(EventsObj.Typing, data?._id);
    }

    checkTimer();
  };

  const checkTimer = () => {
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket.emit(EventsObj.StopTyping, data?._id);
        setTyping(false);
      }
    }, timerLength);
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <Text.H3>{data?.isGroupChat ? data.chatName : getSender(user, data?.users || [])}</Text.H3>
        <div>
          <button
            className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded"
            onClick={handleOpen}>
            <CgEye className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex-1 flex overflow-auto rounded flex-col bg-slate-200">
        <div className="flex-1 p-2 h-full">
          <ScrollableFeed className="h-full">
            {messages.data &&
              messages.data?.map((message) => {
                const isMessageFromSender = message.sender._id === user?._id;

                const variant = isMessageFromSender ? 'sender' : 'recipient';

                return <MessageBox key={message._id} message={message.content} variant={variant} />;
              })}
          </ScrollableFeed>
        </div>
      </div>
      {isTyping && (
        <div className="h-5">
          <img className="w-14" src={typingGif} alt="" />
        </div>
      )}
      <form
        action=""
        onSubmit={handleSendMessage}
        className="flex py-2 bg-white gap-2 justify-between items-center">
        <FormField
          className="flex-1 mb-0"
          name="message"
          inputClassName="bg-white"
          value={message}
          onChange={handleChange}
        />
        <Button className="py-2">Send</Button>
      </form>
      <ProfileModal
        handleClose={handleCloseProfile}
        state={isProfileShown}
        user={getSenderFull(user, data?.users || [])}
      />
      <UpdateGroupModal
        data={data}
        handleClose={handleCloseGroupUpdate}
        state={isGroupUpdateShown}
      />
    </>
  );
};

export default ChatScreen;
