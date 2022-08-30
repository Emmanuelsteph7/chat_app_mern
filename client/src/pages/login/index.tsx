import { LoginForm } from './components';
import { LoginFormI } from './components/loginForm';
import { useAppDispatch } from 'app/store';
import { loginUser } from 'app/index';
import { AuthLayout } from 'layouts';
import { loginBg } from 'assets';
import { useErrorAlert, useSuccessAlert } from 'components';

const Login = () => {
  const dispatch = useAppDispatch();

  const successAlert = useSuccessAlert();
  const errorAlert = useErrorAlert();

  const handleSubmit = async (values: LoginFormI) => {
    dispatch(
      loginUser({
        successAlert,
        errorAlert,
        payload: { email: values.email, password: values.password }
      })
    );
  };

  return (
    <AuthLayout backgroundImage={loginBg}>
      <LoginForm handleSubmit={handleSubmit} />
    </AuthLayout>
  );
};

export default Login;
