import { AxiosConfig } from 'config/axiosConfig';
import { LoginFormI } from 'pages/login/components/loginForm';
import { RegisterFormI } from 'pages/register/components/registerForm';

const config = {
  headers: {
    'Content-Type': 'application/json'
  }
};

export const loginService = async (payload: LoginFormI) => {
  return await AxiosConfig.post('/api/user/login', payload, config);
};

export const registerService = async (payload: RegisterFormI) => {
  return await AxiosConfig.post('/api/user', payload, config);
};
