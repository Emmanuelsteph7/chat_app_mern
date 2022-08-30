import React, { ReactNode } from 'react';
import cs from 'classnames';

interface Props {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ children, className }) => {
  const classes = cs('container', {
    [`${className}`]: className
  });
  return <div className={classes}>{children}</div>;
};

export default Container;
