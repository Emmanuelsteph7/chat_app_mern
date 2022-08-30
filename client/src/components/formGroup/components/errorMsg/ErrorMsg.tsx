import React, { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

const ErrorMsg: React.FC<Props> = ({ children }) => {
  return <div className="text-danger"> {children}</div>;
};

export default ErrorMsg;
