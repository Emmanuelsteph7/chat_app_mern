import { RootState } from 'app/store';
import { ProfileModal, Text } from 'components';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { useSelector } from 'react-redux';
import { ChatI } from 'types/client';
import { getSender } from 'utils';
import { getSenderFull } from 'utils/getSender';

interface Props {
  data: ChatI | null;
}

const ChatScreen: React.FC<Props> = ({ data }) => {
  const [isProfileShown, setIsProfileShown] = useState(false);

  const user = useSelector((state: RootState) => state.user.user);

  const handleOpenProfile = () => setIsProfileShown(true);
  const handleCloseProfile = () => setIsProfileShown(false);
  return (
    <>
      <div className="flex justify-between items-center">
        <Text.H3>{data?.isGroupChat ? data.chatName : getSender(user, data?.users || [])}</Text.H3>
        <div>
          <button
            className="w-10 h-10 flex justify-center items-center bg-slate-200 rounded"
            onClick={handleOpenProfile}>
            <CgProfile className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="flex-1 bg-slate-200"></div>
      <ProfileModal
        handleClose={handleCloseProfile}
        state={isProfileShown}
        user={getSenderFull(user, data?.users || [])}
      />
    </>
  );
};

export default ChatScreen;