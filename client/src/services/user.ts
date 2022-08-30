import { AxiosConfig } from 'config/axiosConfig';

const config = (token: string) => {
  return {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  };
};

export const getUsersService = async (token: string, search?: string) => {
  return await AxiosConfig.get(`/api/user?search=${search || ''}`, config(token));
};
