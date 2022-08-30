import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const Normal: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('text-base', {
    [`${className}`]: className
  });
  return <p className={classes}>{children}</p>;
};

export default Normal;
