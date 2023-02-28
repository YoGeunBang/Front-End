import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveTokenAction } from 'store/token';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();
  const BACKEND_URL = 'https://ygb.server.swygbro.com/members';
  
  const postToken = async (_token: string) => {
    await axios
      .post(`https://cors-anywhere.herokuapp.com/${BACKEND_URL}`, {
        accessToken: _token,
      })
      .then((res) => {
        dispatch(saveTokenAction({token: res.data.accessToken}));
      });
  };

  const getToken = () => {
    const hash = Router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
    if (hash) {
      const token = hash.split('=')[1].split('&')[0]; // token값 확인
      postToken(token);
      Router.push({
        pathname: '/',
      });
      // naverLogin.getLoginStatus((status: any) => {
      //   if (status) {
      //     // 로그인 상태 값이 있을 경우
      //     console.log(naverLogin.user); // 사용자 정보 조회
      //     // /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
      //
      //   }
      // });
    }
  };
  useEffect(() => {
    getToken();
  }, []);

  return <MypageEl>콜백페이지 입니다만..?</MypageEl>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
const MypageEl = styled.div`
  padding: 80px 12.5% 10% 12.5%;
  position: relative;
  min-height: calc(100vh - 150px);
  display: block;
`;
export default Page;
