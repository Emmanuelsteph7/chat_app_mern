import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const H1: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('text-5xl', {
    [`${className}`]: className
  });

  return <h1 className={classes}>{children}</h1>;
};

export default H1;
