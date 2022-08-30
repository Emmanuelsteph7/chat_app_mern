import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import cs from 'classnames';

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = ({ className }) => {
  const classes = cs('animate-spin', {
    [`${className}`]: className
  });
  return (
    <div className="w-fit">
      <FaSpinner className={classes} />
    </div>
  );
};

export default Spinner;
