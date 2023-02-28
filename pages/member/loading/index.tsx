import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { saveTokenAction } from 'store/token';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import Router from 'next/router';

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const query_token = router.query;
  console.log(query_token);
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.token);

  const BACKEND_URL = 'https://ygb.server.swygbro.com/members';

  const postToken = async (_token: any) => {
    await axios
      .post(`https://cors-anywhere.herokuapp.com/${BACKEND_URL}`, {
        accessToken: _token,
      })
      .then((res) => {
        dispatch(saveTokenAction({ token: res.data.accessToken }));
      });
  };
  useEffect(() => {
    postToken(query_token);
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

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
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
        transform:translateX(0);
      }
      100% {
        transform:translateX(600%);
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
      animation: Move 1s 1s infinite;
    }
  }
`;
export default Page;
