import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const Medium: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('medium', {
    [`${className}`]: className
  });

  return <p className={classes}>{children}</p>;
};

export default Medium;
