import { Button, FormField, LinkTag, Text } from 'components';
import { Schema, useForm } from 'hooks';
import { Path } from 'navigations/routes';
import React from 'react';

export interface RegisterFormI {
  name: string;
  email: string;
  password: string;
  // confirmPwd: string;
}

const initialState: RegisterFormI = {
  name: '',
  email: '',
  password: ''
  // confirmPwd: ''
};

const schema: Schema = {
  name: {
    type: 'string',
    required: true,
    errorMsg: {
      required: 'Please enter your name'
    }
  },
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
    min: 6,
    errorMsg: {
      required: 'Please enter your email',
      min: 'Password should be 6 or more characters'
    }
  }
};

interface Props {
  handleSubmit: (values: RegisterFormI) => Promise<void>;
}

const RegisterForm: React.FC<Props> = ({ handleSubmit: submitFunc }) => {
  const { inputs, errors, handleChange, handleSubmit } = useForm<RegisterFormI>(initialState, {
    schema,
    validateOptions: 'validateOnSubmit',
    submitFunc
  });

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-lg px-4 py-6">
      <Text.H3 className="text-center mb-5">Register</Text.H3>
      <FormField
        name="name"
        onChange={handleChange}
        value={inputs.name}
        error={errors.name}
        label="Name"
      />
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
        <Button type="submit" fullWidth>
          Submit
        </Button>
      </div>
      <p className="mt-5 text-center">
        Already have an account? <LinkTag to={Path.Login}>Login</LinkTag>
      </p>
    </form>
  );
};

export default RegisterForm;
