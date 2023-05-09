import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getCookie } from 'cookies-next';

const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.NEXT_PUBLIC_DEVELOP_URL}`
    : `${process.env.NEXT_PUBLIC_PRODUCT_URL}`; // 기본 서버 주소 입력
// 서비스 인증토큰이 필요한 api
export const authAxios: AxiosInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
  headers: {
    Authorization: !!getCookie('token') ? `${getCookie('token')}` : '',
  },
});

// 서비스 인증토큰이 필요하지 않은 api
export const notAuthAxios: AxiosInstance = axios.create({
  baseURL: `${BACKEND_URL}`,
});

// naver 인가 코드를 이용하여 서비스 전용 인증토큰 발급 api
export const getTokenApi = (_code: string): Promise<AxiosResponse> => {
  return notAuthAxios.post('/members', {
    // 백엔드에 네이버 토큰으로 서비스 토큰 발급
    accessToken: _code,
  });
};

// 회원 정보를 가져오는 api
export const getUserInfoApi = () => {
  return authAxios.get('/members');
};

// 회원 탈퇴 api
export const DeleteMemberApi = () => {
  return authAxios.delete('/members');
};
