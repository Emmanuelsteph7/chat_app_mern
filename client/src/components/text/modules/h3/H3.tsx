import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const H3: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('text-3xl', {
    [`${className}`]: className
  });

  return <h3 className={classes}>{children}</h3>;
};

export default H3;
