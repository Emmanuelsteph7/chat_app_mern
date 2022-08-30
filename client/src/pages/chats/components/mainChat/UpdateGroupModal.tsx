import { Dialog } from '@headlessui/react';
import { getUsers, renameGroup, setUsers } from 'app/index';
import { RootState, useAppDispatch } from 'app/store';
import {
  Button,
  FormField,
  Skeleton,
  Text,
  useErrorAlert,
  UserPeel,
  useSuccessAlert
} from 'components';
import { useDebounce } from 'hooks';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatI, UserI } from 'types/client';
import UserBox from '../searchBox/UserBox';

interface Props {
  state: boolean;
  handleClose: () => void;
  data: ChatI | null;
}

interface FormStateI {
  name: string;
  search: string;
  users: UserI[];
}

const UpdateGroupModal: React.FC<Props> = ({ handleClose, state, data }) => {
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

  useEffect(() => {
    if (data) {
      setFormState((prev) => ({
        ...prev,
        users: data.users
      }));
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));

  const handleNameUpdate = () => {
    dispatch(
      renameGroup({
        successAlert,
        errorAlert,
        payload: {
          data: {
            name: formState.name,
            chatId: data?._id || ''
          },
          token: token || ''
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
          {/* <form> */}
          <Text.H3 className="text-center">{data?.chatName}</Text.H3>
          {/* <Dialog.Description>This will permanently deactivate your account</Dialog.Description> */}

          <div className="flex flex-wrap items-center mb-4">
            {formState?.users.map((user) => (
              <div className="mr-2" key={user._id}>
                <UserPeel user={user} />
              </div>
            ))}
          </div>

          <div className="my-4">
            <div className="flex justify-between items-center gap-3 mb-5">
              <FormField
                name="name"
                value={formState.name}
                onChange={handleChange}
                placeholder="Chat Name"
                className="mb-0 flex-1"
              />
              <Button className="p-2" onClick={handleNameUpdate}>
                Update
              </Button>
            </div>
            <FormField
              name="search"
              onChange={handleChange}
              placeholder="Add Users eg: John, Barry, etc"
              value={formState.search}
            />
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
          {/* </form> */}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default UpdateGroupModal;
