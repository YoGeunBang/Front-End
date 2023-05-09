import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
const { token } = useSelector((state: RootState) => state.token);

const BACKEND_URL =
  process.env.NODE_ENV === 'development'
    ? `${process.env.NEXT_PUBLIC_DEVELOP_URL}`
    : `${process.env.NEXT_PUBLIC_PRODUCT_URL}`; // 기본 서버 주소 입력

export const authAxios: AxiosInstance = axios.create({
  baseURL: `${BACKEND_URL}/members/`,
  headers: {
    Authorization: token,
  },
});

// 회원 탈퇴 api
export const DeleteMemberApi = () => {
  return authAxios.delete('/member');
};
