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

  // localhost에서 api 접근 시 cors 발생으로 테스트용으로 proxy 데모 서버 사용. 추후 백엔드에서 처리
  const BACKEND_URL =
    process.env.NODE_ENV === 'development'
      ? 'https://cors-anywhere.herokuapp.com/https://ygb.server.swygbro.com/members'
      : 'https://ygb.server.swygbro.com/members';

  const saveUserInfo = async () => {

    const hash = Router.asPath.split('#')[1]; // 네이버에서 응답받은 hash 값

    if (hash) {
      try {
        const hash_token = hash.split('=')[1].split('&')[0]; // hash 내 token string 파싱

        const postToken_res = await axios.post(BACKEND_URL, {
          // 백엔드에 네이버 토큰으로  및 서비스 토큰 발급
          accessToken: hash_token,
        });
        const getUserInfo_res = await axios.get(BACKEND_URL, { // 사용자 정보 조회
          headers: { Authorization: postToken_res.data.accessToken },
        });

        // 응답값 redux 저장
        dispatch(
          saveTokenAction({
            token: postToken_res.data.accessToken,
            nickname: getUserInfo_res.data.nickname,
            profile_img: getUserInfo_res.data.profileImage,
          }),
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    // 페이지 진입시 url로 발급받은 hash 제거 (토큰 노출 방지)
    history.replaceState({}, '', location.pathname);
    saveUserInfo();
  }, []);

  useEffect(() => {
    // 토큰 발급이 완료되면 홈으로 이동
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
  return page;
};

export default Page;
