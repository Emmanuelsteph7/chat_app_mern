import React from 'react';
import { UserI } from 'types/client';

interface Props {
  user: UserI;
}

const UserPeel: React.FC<Props> = ({ user }) => {
  const { name } = user;
  return (
    <div className="flex items-center p-2 rounded bg-primary text-white">
      <span className="mr-2">{name}</span>
      <span>x</span>
    </div>
  );
};

export default UserPeel;
