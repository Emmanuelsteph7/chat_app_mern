import axios from 'axios';

const baseURL = 'http://localhost:5000';

export const AxiosConfig = axios.create({
  baseURL
});
