import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : process.env.NEXT_PUBLIC_BACKEND,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
