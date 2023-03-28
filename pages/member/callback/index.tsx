import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Router from 'next/router';
import { saveTokenAction } from 'store/token';
import axios from 'axios';
import { RootState } from 'store';

const Page: NextPageWithLayout = () => {
  const { token } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();
  
  // develop 환경에서는 프록시 서버를 통한 테스트 cors 에러 처리
  const BACKEND_URL =
    process.env.NODE_ENV === 'development'
      ? 'https://cors-anywhere.herokuapp.com/https://ygb.server.swygbro.com/members'
      : 'https://ygb.server.swygbro.com/members';

  const postToken = (_token: any) => {
    axios
      .post(BACKEND_URL, {
        accessToken: _token,
      })
      .then((res) => {
        const session_token = {
          key : res.data.accessToken,
          expire : Date.now() + 86400
        }
        const sessionTokenString = JSON.stringify(session_token);
        dispatch(saveTokenAction({ token: sessionTokenString }));
      });
  };
  const getToken = () => {
    const hash = Router.asPath.split('#')[1]; // 네이버 로그인을 통해 전달받은 hash 값
    if (hash) {
      const token = hash.split('=')[1].split('&')[0]; // token값 확인
      postToken(token);
    }
  };
  useEffect(() => {
    history.replaceState({}, '', location.pathname);
    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      Router.push({
        pathname: '/',
      });
    }
  }, [token]);

  return (
    <Container>
      <ContentBox>
        <span>로그인 진행중</span>
      </ContentBox>
    </Container>
  );
};

const Container = styled.div`
  padding: 80px 12.5% 10% 12.5%;
  position: relative;
  min-height: calc(100vh - 150px);
  display: block;
`;
const ContentBox = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: multiply;
  z-index: 99999;
  span {
    position: relative;
    font-size: 1.5rem;
    color: #fff;
    padding: 10px 0;
    overflow: hidden;
    @keyframes Move {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(700%);
      }
    }
    &::before {
      content: '';
      position: absolute;
      left: -20%;
      bottom: 0px;
      display: block;
      width: 20%;
      border-radius: 2px;
      height: 4px;
      background-color: #00c2d6;
      animation: Move 1s infinite;
    }
  }
`;
Page.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Page;
