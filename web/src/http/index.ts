import { message } from 'antd';
import axios from 'axios';
import { history } from '@umijs/max';

const httpRequest = axios.create({
  baseURL: process.env.BASE_URL,
  timeout: 3000,
});

httpRequest.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpRequest.interceptors.response.use(
  (response) => {
    const data = response.data;

    if (data.code === 200) {
      return data.data;
    }

    // auth
    if (data.code === 401) {
      history.push('/login');
      return Promise.reject(data);
    }

    message.error(data.message);
    return Promise.reject(data);
  },
  async (error) => {
    message.error('server error');
    return Promise.reject(error);
  },
);

export default httpRequest;
