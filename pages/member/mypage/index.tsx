import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement, useEffect } from 'react';
import styled from 'styled-components';
import { TemplateEl } from 'styles/detail.styled';
import { LogOutButton } from 'components/common';
import { deleteTokenAction } from 'store/token';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import axios from 'axios';
import Router from 'next/router';

const Page: NextPageWithLayout = () => {
  const { token, nickname, profile_img } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();

  const BACKEND_URL =
    process.env.NODE_ENV === 'development'
      ? `https://cors-anywhere.herokuapp.com/https://ygb.server.swygbro.com/members/`
      : `https://ygb.server.swygbro.com/members/`;

  const deleteMember = async () => {
    let isDelete = confirm('정말로 탈퇴하시겠습니까?');
    if (isDelete && token) {
      try {
        const delete_res = await axios.delete(BACKEND_URL, {
          headers: { Authorization: token },
        });
        dispatch(deleteTokenAction());
        Router.push({
          pathname: '/',
        });
      } catch (res) {
        console.log(res);
      }
    }
  };

  return (
    <>
      <TemplateEl className="template">
        <div className="container">
          <UserProfileArea>
            <UserProfileImgArea>
              <img src={profile_img ? profile_img : '/assets/img/profile_default.svg'} alt="프로필이미지"></img>
              <button>
                <img src="/assets/img/edit.svg" alt="프로필이미지수정버튼" />
              </button>
            </UserProfileImgArea>
            <span>닉네임</span>
          </UserProfileArea>
          <MyProfileSection>
            <div className="row-1">
              <span className="col-1">내 프로필</span>
            </div>
            <div className="row-2">
            <span className="col-1">별명</span>
              <span className="col-2">{nickname}</span>
            </div>
          </MyProfileSection>
          <MyProfileSection>
            <div className="row-1">
              <span className="col-1">계정 관리</span>
            </div>
            <div className="row-2">
              <span className="col-1">
                <button onClick={deleteMember} style={{ textDecorationLine: 'underline' }}>
                  회원 탈퇴
                </button>
              </span>
            </div>
            <div className="row-3">
              <span className="col-1">
                <LogOutButton />
              </span>
            </div>
          </MyProfileSection>
        </div>
      </TemplateEl>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const UserProfileArea = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 0;
  @media screen and (max-width: 970px) {
    padding: 56px 0 36px;
  }
  span {
    position: relative;
    margin-top: 30px;
    font-weight: 600;
    font-size: 3.6rem;
  }
`;
const UserProfileImgArea = styled.div`
  position: relative;
  > img {
    position: relative;
    display: block;
    background-color: #fff;
    border-radius: 50%;
    width: 146px;
    height: 146px;
  }
  > button {
    position: absolute;
    display: block;
    bottom: 0;
    right: -16px;
    border-radius: 50%;
    border: none;
    background-color: #9e9e9e;
    width: 40px;
    height: 40px;
    padding: 0;
    border: #fff solid 2px;
    svg {
      color: white;
    }
  }
`;
const MyProfileSection = styled.section`
  position: relative;
  border-radius: 8px;
  box-shadow: 6px 12px 32px rgba(0, 0, 0, 0.08);
  font-weight: 500;
  font-size: 2rem;
  margin-bottom: 80px;
  
  > * {
    position: relative;
    display: flex;
    align-items: center;
    height: 72px;
    white-space: nowrap;
    padding: 0 3.75%;
    .col-1 {
      color: #424242;
      width: 15%;
    }
    .col-2 {
      color: #616161;
    }
    &.row-1 {
      height: 78px;
      background-color: #f5f5f5;
      .col-1 {
        font-size: 2.4rem;
        color: #212121;
      }
    }
  }
  button {
    border: none;
    background-color: transparent;
    font-size: 2rem;
    padding: 0;
    color: #616161;
    span {
      font-size: 2rem;
    }
  }
`;

export default Page;
