import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const H2: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('text-4xl', {
    [`${className}`]: className
  });

  return <h2 className={classes}>{children}</h2>;
};

export default H2;
