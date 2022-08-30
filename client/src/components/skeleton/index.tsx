import React from 'react';
import cs from 'classnames';

interface Props {
  className?: string;
}

const Skeleton: React.FC<Props> = ({ className }) => {
  const classes = cs('w-full bg-slate-200 animate-pulse h-10 rounded', {
    [`${className}`]: className
  });
  return <div className={classes}></div>;
};

export default Skeleton;
