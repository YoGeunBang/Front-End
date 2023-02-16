import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import Link from 'next/link';
import { ReactElement } from 'react';
import styled from 'styled-components';
import Router from 'next/router';
import { useEffect } from 'react';

const Page: NextPageWithLayout = () => {
  let naverLogin: any;

  const login = () => {
    naverLogin = new window.naver.LoginWithNaverId({
      clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID, // ClientID
      callbackUrl: 'http://localhost:3000/member/callback', // Callback URL
      isPopup: false, // 팝업 형태로 인증 여부
      loginButton: {
        color: '#03C75A', // 색상
        type: 3, // 버튼 크기
        height: '60', // 버튼 높이
      }, // 로그인 버튼 설정
    });

    naverLogin.init();
  };

  const getToken = () => {
    const hash = Router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
    if (hash) {
      const token = hash.split('=')[1].split('&')[0]; // token값 확인
      naverLogin.getLoginStatus((status: any) => {
        if (status) {
          // 로그인 상태 값이 있을 경우
          console.log(naverLogin.user); // 사용자 정보 조회
          // /naver 페이지로 token값과 함께 전달 (서비스할 땐 token 전달을 하지 않고 상태 관리를 사용하는 것이 바람직할 것으로 보임)
          Router.push({
            pathname: '/naver',
            query: {
              token: token,
            },
          });
        }
      });
    }
  };


  useEffect(() => {
    login();
    getToken();
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
          <img src="/assets/img/loginbutton.png" alt="네이버로그인버튼이미지"/>
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
const NaverIdLogin = styled.div`
`
export default Page;
