import { getSelectedChat } from 'app/index';
import { RootState, useAppDispatch } from 'app/store';
import { Text, useErrorAlert, useSuccessAlert } from 'components';
import React from 'react';
import { useSelector } from 'react-redux';
import { UserI } from 'types/client';

interface Props {
  name: string;
  email: string;
  image: string;
  _id: string;
  handleClose: () => void;
  handleClick?: () => void;
}

const UserBox: React.FC<Props> = ({ email, _id, image, name, handleClose, handleClick }) => {
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user.user);

  const successAlert = useSuccessAlert();
  const errorAlert = useErrorAlert();

  const handleQuery = () => {
    dispatch(
      getSelectedChat({
        successAlert,
        errorAlert,
        payload: { userId: _id, token: user?.token || '', closeNav: handleClose }
      })
    );
  };

  const onClick = () => {
    if (handleClick) {
      handleClick();
    } else {
      handleQuery();
    }
  };
  return (
    <div
      onClick={onClick}
      className="bg-slate-200 text-primary hover:text-white cursor-pointer hover:bg-primary gap-4 flex items-center mb-5 rounded-lg shadow p-2">
      <div className="w-10 h-10 rounded-full overflow-hidden shadow">
        <img src={image} alt="" />
      </div>
      <div className="flex-1">
        <Text.H4 className=" mb-1">{name}</Text.H4>
        <Text className="">Email: {email}</Text>
      </div>
    </div>
  );
};

export default UserBox;
