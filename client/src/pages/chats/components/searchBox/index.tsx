import React, { useState } from 'react';
import {
  Button,
  FormField,
  Skeleton,
  Spinner,
  Text,
  useErrorAlert,
  useSuccessAlert
} from 'components';
import { BiSearch } from 'react-icons/bi';
import cs from 'classnames';
import UserBox from './UserBox';
import { RootState, useAppDispatch } from 'app/store';
import { getUsers } from 'app/features/allUsers';
import { useSelector } from 'react-redux';

const SearchBox = () => {
  const [showNav, setShowNav] = useState(false);
  const [search, setSearch] = useState('');
  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.user.user?.token);
  const users = useSelector((state: RootState) => state.users);
  const selectedChat = useSelector((state: RootState) => state.chat.selectedChat);

  const successAlert = useSuccessAlert();
  const errorAlert = useErrorAlert();

  const handleOpen = () => setShowNav(true);
  const handleClose = () => setShowNav(false);

  const handleSearch = () => {
    if (!search) {
      return errorAlert({
        message: 'Please enter a value in the search'
      });
    }

    dispatch(
      getUsers({
        successAlert,
        errorAlert,
        payload: {
          search,
          token: token || ''
        }
      })
    );
  };

  const navClasses = cs('fixed h-screen w-screen ease-in shadow top-0 duration-200 z-30', {
    'left-0': showNav,
    '-left-full': !showNav
  });

  return (
    <>
      <Button onClick={handleOpen} className="flex items-center">
        <BiSearch /> <span className="ml-2">Search User</span>
      </Button>
      <div className={navClasses}>
        <div className="relative w-full h-full">
          <div
            onClick={handleClose}
            className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
          <div className="h-full z-20 relative w-96 bg-white shadow">
            <div className="px-3 py-4">
              <Text.H4 className="">Search Users</Text.H4>
              <div className="flex items-center gap-4 my-5 justify-between">
                <FormField
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  className="mb-0 flex-1"
                />
                <Button onClick={handleSearch}>Go</Button>
              </div>
              <div>
                {selectedChat.loading && (
                  <div className="flex justify-center py-3">
                    <Spinner className="text-2xl" />
                  </div>
                )}
                {users?.loading ? (
                  [1, 2, 3, 4, 5, 6].map((item) => <Skeleton className="mb-2 h-16" key={item} />)
                ) : users?.users?.length ? (
                  users?.users?.map((user, index) => (
                    <UserBox {...user} handleClose={handleClose} image={user.picture} key={index} />
                  ))
                ) : (
                  <>
                    {/* <Skeleton className="h-14" />
                    <div>No user found</div> */}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
