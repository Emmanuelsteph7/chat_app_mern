import { registerUser } from 'app/features/user';
import { useAppDispatch } from 'app/store';
import { registerBg } from 'assets';
import { useErrorAlert, useSuccessAlert } from 'components';
import { AuthLayout } from 'layouts';
import React from 'react';
import { RegisterForm } from './components';
import { RegisterFormI } from './components/registerForm';

const Register = () => {
  const dispatch = useAppDispatch();

  const successAlert = useSuccessAlert();
  const errorAlert = useErrorAlert();

  const handleSubmit = async (values: RegisterFormI) => {
    dispatch(
      registerUser({
        successAlert,
        errorAlert,
        payload: { name: values.name, email: values.email, password: values.password }
      })
    );
  };

  return (
    <AuthLayout backgroundImage={registerBg}>
      <RegisterForm handleSubmit={handleSubmit} />
    </AuthLayout>
  );
};

export default Register;
