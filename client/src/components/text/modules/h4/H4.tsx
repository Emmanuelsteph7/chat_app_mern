import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const H4: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('text-2xl', {
    [`${className}`]: className
  });

  return <h4 className={classes}>{children}</h4>;
};

export default H4;
