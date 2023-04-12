import styled from 'styled-components';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { deleteTokenAction } from 'store/token';
import { useDispatch } from 'react-redux';
import { RootState } from 'store';

const LogOutButton = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state: RootState) => state.token);
  const onClick = () => {
    dispatch(deleteTokenAction());
    alert('로그아웃되었습니다.');
    Router.push({
      pathname: '/',
    });
  };

  return (
    <LogOutButtonEl onClick={onClick}>
      <span>로그아웃</span>
    </LogOutButtonEl>
  );
};

const LogOutButtonEl = styled.button`
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

export default LogOutButton;
