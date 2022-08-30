import { IoNotifications } from 'react-icons/io5';
import React, { useState } from 'react';
import SearchBox from '../searchBox';
import AvatarDropdown from './AvatarDropdown';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'app/store';
import { ProfileModal } from 'components';
import { removeUser } from 'app/index';

const Header = () => {
  const [isProfileShown, setIsProfileShown] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useAppDispatch();

  const handleOpenProfile = () => setIsProfileShown(true);
  const handleCloseProfile = () => setIsProfileShown(false);

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    dispatch(removeUser());
  };
  return (
    <header className="fixed top-0 z-10 py-2 px-4 left-0 w-full flex justify-between items-center bg-white">
      <div>
        <SearchBox />
      </div>
      <div>Logo</div>
      <div className="flex items-center gap-4">
        <div>
          <IoNotifications />
        </div>
        <AvatarDropdown
          handleLogout={handleLogout}
          handleOpenProfile={handleOpenProfile}
          user={user}
        />
      </div>
      <ProfileModal user={user} handleClose={handleCloseProfile} state={isProfileShown} />
    </header>
  );
};

export default Header;
