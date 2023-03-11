import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { useEffect } from 'react';
import { RootState } from 'store';

const Page: NextPageWithLayout = () => {

  let naverLogin: any;
  const { token } = useSelector((state: RootState) => state.token);
  const login = () => {
    naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, // ClientID
      callbackUrl: 'http://localhost:3000/member/callback', // Callback URL
      isPopup: false, // 팝업 형태로 인증 여부
      loginButton: {
        type: 3, // 버튼 크기
        height: '60', // 버튼 높이
      }, // 로그인 버튼 설정
    });

    naverLogin.init();
  };

  

  useEffect(() => {
    if(!token) {
      login();
    }
    else {
      Router.push(
        {
          pathname: '/',
        },
      );
      alert('이미 로그인 상태 입니다.');
    }
  }, []);

  return (
    <LoginEl>
      <Link href="/">
        <a className="logo">
          <img src="/assets/img/logo.png" />
        </a>
      </Link>
      <ButtonArea>
        <NaverIdLogin id="naverIdLogin">
          <img src="/assets/img/loginbutton.png" alt="네이버로그인버튼이미지" />
        </NaverIdLogin>
      </ButtonArea>
    </LoginEl>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
const LoginEl = styled.div`
  padding: 80px 12.5% 10% 12.5%;
  position: relative;
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .logo {
    position: relative;
    img {
      position: relative;
      width: 348px;
    }
  }
`;
const ButtonArea = styled.div`
  position: relative;
  display: block;
  margin-top: 72px;
`;
const NaverIdLogin = styled.div``;
export default Page;
