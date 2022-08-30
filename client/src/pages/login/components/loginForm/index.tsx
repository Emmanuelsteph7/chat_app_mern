import { RootState } from 'app/store';
import { Button, FormField, LinkTag, Text } from 'components';
import { Schema, useForm } from 'hooks';
import { Path } from 'navigations/routes';
import React from 'react';
import { useSelector } from 'react-redux';

export interface LoginFormI {
  email: string;
  password: string;
}

const initialState: LoginFormI = {
  email: '',
  password: ''
};

const schema: Schema = {
  email: {
    type: 'email',
    required: true,
    errorMsg: {
      required: 'Please enter your email',
      invalid: 'Please enter a valid email'
    }
  },
  password: {
    type: 'string',
    required: true,
    errorMsg: {
      required: 'Please enter your password'
    }
  }
};

interface Props {
  handleSubmit: (values: LoginFormI) => Promise<void>;
}

const LoginForm: React.FC<Props> = ({ handleSubmit: submitFunc }) => {
  const { inputs, errors, handleChange, handleSubmit } = useForm<LoginFormI>(initialState, {
    schema,
    validateOptions: 'validateOnSubmit',
    submitFunc
  });

  const isLoading = useSelector((state: RootState) => state.user.loading);

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-lg px-4 py-6">
      <Text.H2 className="text-center mb-8">Login</Text.H2>
      <FormField
        name="email"
        onChange={handleChange}
        value={inputs.email}
        error={errors.email}
        label="Email Address"
      />
      <FormField
        name="password"
        type="password"
        onChange={handleChange}
        value={inputs.password}
        error={errors.password}
        label="Password"
      />
      <div>
        <Button loading={isLoading} type="submit" fullWidth>
          Submit
        </Button>
      </div>
      <p className="mt-5 text-center">
        Don&apos;t have an account? <LinkTag to={Path.Register}>Register</LinkTag>
      </p>
    </form>
  );
};

export default LoginForm;
