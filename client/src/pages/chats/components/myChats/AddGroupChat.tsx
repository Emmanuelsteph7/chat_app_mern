import React, { useCallback, useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { Button, FormField, Skeleton, Text, useErrorAlert, useSuccessAlert } from 'components';
import { useDebounce, useForm } from 'hooks';
import { RootState, useAppDispatch } from 'app/store';
import { useSelector } from 'react-redux';
import { createGroupChat, getUsers, setUsers, updateAllChats } from 'app/index';
import UserBox from '../searchBox/UserBox';
import { UserI } from 'types/client';
import UserPeel from './UserPeel';

interface Props {
  state: boolean;
  handleClose: () => void;
}

interface FormStateI {
  name: string;
  search: string;
  users: UserI[];
}

const AddGroupChat: React.FC<Props> = ({ handleClose, state }) => {
  const [formState, setFormState] = useState<FormStateI>({
    name: '',
    search: '',
    users: []
  });

  const dispatch = useAppDispatch();
  const token = useSelector((state: RootState) => state.user.user?.token);
  const users = useSelector((state: RootState) => state.users);
  const debouncedSearch = useDebounce(formState.search, 1000);

  const successAlert = useSuccessAlert();
  const errorAlert = useErrorAlert();

  const handleSearch = useCallback(() => {
    if (!debouncedSearch) {
      return errorAlert({
        message: 'Please enter a value in the search'
      });
    }

    dispatch(
      getUsers({
        successAlert,
        errorAlert,
        payload: {
          search: debouncedSearch,
          token: token || ''
        }
      })
    );
  }, [debouncedSearch]);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch();
    } else {
      dispatch(
        setUsers({
          payload: []
        })
      );
    }
  }, [debouncedSearch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  const successFunc = () => {
    handleClose();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createGroupChat({
        successAlert,
        errorAlert,
        payload: {
          data: {
            name: formState.name,
            users: JSON.stringify(formState.users.map((user) => user._id))
          },
          token: token || '',
          otherFunc: successFunc
        }
      })
    );
  };

  const handleAddUser = (user: UserI) => {
    setFormState((prev) => {
      const copied = [...prev.users];

      const userIndex = copied.findIndex((item) => item._id === user._id);

      if (userIndex > -1) {
        copied.splice(userIndex, 1);
      }
      return {
        ...prev,
        users: [user, ...copied],
        search: ''
      };
    });

    dispatch(
      setUsers({
        payload: []
      })
    );
  };
  return (
    <Dialog open={state} onClose={handleClose} className="relative z-50">
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white p-10 w-full max-w-400 rounded-lg">
          <form onSubmit={handleSubmit}>
            <Text.H3 className="text-center">Create Group Chat</Text.H3>
            {/* <Dialog.Description>This will permanently deactivate your account</Dialog.Description> */}

            <div className="my-4">
              <FormField
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Chat Name"
              />
              <FormField
                name="search"
                onChange={handleChange}
                placeholder="Add Users eg: John, Barry, etc"
                value={formState.search}
              />
            </div>

            <div className="flex flex-wrap items-center mb-4">
              {formState.users.map((user) => (
                <div className="mr-2" key={user._id}>
                  <UserPeel user={user} />
                </div>
              ))}
            </div>

            <div className="max-h-250 overflow-auto mb-4">
              {users.loading &&
                [1, 2, 3, 4, 5].map((item) => <Skeleton key={item} className="mb-2 h-20" />)}
              {users?.users?.length &&
                users?.users?.map((user, index) => (
                  <UserBox
                    {...user}
                    handleClose={handleClose}
                    handleClick={() => handleAddUser(user)}
                    image={user.picture}
                    key={index}
                  />
                ))}
            </div>

            <div className="flex justify-center">
              <Button className="px-8" fullWidth>
                Create Group
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddGroupChat;
