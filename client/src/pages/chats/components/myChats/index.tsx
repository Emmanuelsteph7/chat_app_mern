import { getChats } from 'app/index';
import { RootState, useAppDispatch } from 'app/store';
import { Button, Text, useErrorAlert, useSuccessAlert } from 'components';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatUserBox from '../chatUserBox';
import { FiPlus } from 'react-icons/fi';
import AddGroupChat from './AddGroupChat';

const MyChats = () => {
  const [isGroupModal, setIsGroupModal] = useState(false);

  const handleModalOpen = () => setIsGroupModal(true);
  const handleModalClose = () => setIsGroupModal(false);

  const dispatch = useAppDispatch();
  const successAlert = useSuccessAlert();
  const errorAlert = useErrorAlert();

  const user = useSelector((state: RootState) => state.user);
  const chats = useSelector((state: RootState) => state.chat.allChats);

  useEffect(() => {
    dispatch(getChats({ errorAlert, successAlert, payload: { token: user.user?.token || '' } }));
  }, []);
  return (
    <>
      <div className="flex justify-between w-full p-3 items-center absolute top-0 left-0">
        <Text.H3>My Chats</Text.H3>
        <Button onClick={handleModalOpen} className="flex items-center">
          <span className="mr-2">New Group Chat</span> <FiPlus />
        </Button>
      </div>
      <div className="h-full rounded pt-20 overflow-y-hidden">
        <div className="h-full rounded bg-slate-200 pt-2">
          <div className="h-full bg-slate-200 p-2 overflow-y-auto">
            {chats.data?.map((item) => (
              <ChatUserBox chat={item} key={item._id} />
            ))}
          </div>
        </div>
        <AddGroupChat handleClose={handleModalClose} state={isGroupModal} />
      </div>
    </>
  );
};

export default MyChats;
