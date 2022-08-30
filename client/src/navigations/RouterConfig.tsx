import { removeUser, setUser } from 'app/index';
import { RootState, useAppDispatch } from 'app/store';
import React, { lazy, Suspense, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { Path } from './routes';

const Login = lazy(() => import('pages/login'));
const Register = lazy(() => import('pages/register'));
const Chats = lazy(() => import('pages/chats'));
const NotFound = lazy(() => import('pages/notFound'));

const RouterConfig = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    const sessionUser = sessionStorage.getItem('user');

    if (sessionUser) {
      const user = JSON.parse(sessionUser);
      dispatch(setUser(user));
    } else {
      dispatch(removeUser());
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path={Path.Home} element={<Navigate to={Path.Login} />} />
        <Route
          path={Path.Login}
          element={isAuthenticated ? <Navigate to={Path.Chats} /> : <Login />}
        />
        <Route
          path={Path.Register}
          element={isAuthenticated ? <Navigate to={Path.Chats} /> : <Register />}
        />
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} sessionKey="user" />}>
          <Route path={Path.Chats} element={<Chats />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default RouterConfig;
