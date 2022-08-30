import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Path } from './routes';

interface Props {
  isAuthenticated: boolean;
  sessionKey: string;
}

const ProtectedRoute: React.FC<Props> = ({ isAuthenticated, sessionKey }) => {
  if (!isAuthenticated && !sessionStorage.getItem(sessionKey)) {
    return <Navigate to={Path.Login} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
