import styled from 'styled-components';
import Router from 'next/router'
import { useCallback } from 'react';

const LoginButton = () => {

  const moveLogin = useCallback(() => {
    Router.push({
      pathname: '/member/login',
    })
  },[])
  
  return (
    <LoginButtonEl onClick={moveLogin}>
      <span>로그인</span>
    </LoginButtonEl>
  );
};

const LoginButtonEl = styled.button`
  span {
    font-size: 1.6rem;
    letter-spacing: -0.02em;
    color: #767676;
    line-height: 150%;
  }
  padding: 5px 25px;
  background-color: #fff;
  border: 1px solid #cdcdcd;
  border-radius: 4px;
`;

export default LoginButton;
