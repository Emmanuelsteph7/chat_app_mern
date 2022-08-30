import { Container } from 'components';
import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  backgroundImage: string;
}

const AuthLayout: React.FC<Props> = ({ children, backgroundImage }) => {
  return (
    <div className="h-screen flex justify-center items-center bg-primary">
      <Container>
        <div className="shadow h-screen max-h-600 max-w-6xl mx-auto flex justify-between rounded-lg overflow-hidden items-center">
          <div
            className="flex-1 h-full max-w-600 bg-secondary"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.4)), url(${backgroundImage})`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}></div>
          <div className="flex-1 bg-white h-full flex justify-center items-center">{children}</div>
        </div>
      </Container>
    </div>
  );
};

export default AuthLayout;
