import React from 'react';
import { UserI } from 'types/client';
import cs from 'classnames';
import { Text } from 'components';

interface Props {
  message: string;
  variant: 'sender' | 'recipient';
  user?: UserI;
}

const MessageBox: React.FC<Props> = ({ message, user, variant }) => {
  const classes = cs('flex items-center', {
    'justify-end': variant === 'sender',
    'justify-start': variant === 'recipient'
  });

  const textClasses = cs('w-max max-w-7/12 py-2 px-4 rounded mt-2', {
    'bg-primary text-white': variant === 'sender',
    'bg-white text-primary': variant === 'recipient'
  });
  return (
    <div className={classes}>
      <Text.Medium className={textClasses}>{message}</Text.Medium>
    </div>
  );
};

export default MessageBox;
