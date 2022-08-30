import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  children?: ReactNode;
}

const MetaData: React.FC<Props> = ({ children }) => {
  return <Helmet>{children}</Helmet>;
};

export default MetaData;
