import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const H5: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('h5', {
    [`${className}`]: className
  });

  return <h5 className={classes}>{children}</h5>;
};

export default H5;
