import { TextProps } from '../../types/textTypes';
import cs from 'classnames';

const Paragraph: React.FC<TextProps> = ({ children, className }) => {
  const classes = cs('text-sm', {
    [`${className}`]: className
  });

  return <p className={classes}>{children}</p>;
};

export default Paragraph;
