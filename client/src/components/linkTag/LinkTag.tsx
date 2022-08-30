import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import cs from 'classnames';

interface Props {
  to: string;
  externalLink?: string;
  children: JSX.Element | ReactNode;
  className?: string;
}

const LinkTag: React.FC<Props> = ({ to, children, externalLink, className, ...rest }) => {
  const classes = cs('linkTag', {
    [`${className}`]: className
  });
  return (
    <Link
      className={classes}
      to={externalLink ? { pathname: externalLink } : to}
      target={externalLink ? '_blank' : '_self'}
      {...rest}>
      {children}
    </Link>
  );
};
export default LinkTag;
