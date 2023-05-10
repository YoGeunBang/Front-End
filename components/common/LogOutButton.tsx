import styled from 'styled-components';
import Router from 'next/router';
import { resetUserAction } from 'store/user';
import { useDispatch } from 'react-redux';
interface logOutButtonPropsType {
  imgSrc?:string;
  children?:string;
}
const LogOutButton = ({children,imgSrc}:logOutButtonPropsType) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(resetUserAction());
    alert('로그아웃되었습니다.');
    Router.push({
      pathname: '/',
    });
  };
  return (
    <LogOutButtonEl onClick={onClick}>
      {children && <span>{children}</span>}
      {imgSrc && <img src={imgSrc} alt='로그아웃버튼이미지'/>}
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
