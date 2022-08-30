import React from 'react';
import { UserI } from 'types/client';

interface Props {
  user: UserI;
  onClick?: () => void;
}

const UserPeel: React.FC<Props> = ({ user, onClick }) => {
  const { name } = user;
  return (
    <div className="flex items-center p-2 rounded bg-primary text-white">
      <span className="mr-2">{name}</span>
      <span onClick={onClick}>x</span>
    </div>
  );
};

export default UserPeel;
