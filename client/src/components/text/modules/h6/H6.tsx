import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const H6: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('h6', {
    [`${className}`]: className
  });

  return <h6 className={classes}>{children}</h6>;
};

export default H6;
