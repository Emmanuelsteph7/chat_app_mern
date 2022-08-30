import React, { ReactNode } from 'react';

interface Props {
  id: string;
  children?: ReactNode;
}

const LabelText: React.FC<Props> = ({ children, id }) => {
  return (
    <label className="mb-1" htmlFor={id}>
      {children}
    </label>
  );
};

export default LabelText;
