import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { TemplateEl } from 'styles/detail.styled';

const Page: NextPageWithLayout = () => {
  return (
    <TemplateEl className='template'>
      <div className="container">
        <UserProfileArea>
          <UserProfileImgArea>
            <img src="/assets/img/profile_default.svg" alt="프로필이미지"></img>
            <button>
              <img src="/assets/img/edit.svg" alt="프로필이미지수정버튼" />
            </button>
          </UserProfileImgArea>
          <span>닉네임</span>
        </UserProfileArea>
        <MyProfileSection>
          <div className="row-1">
            <span className='col-1'>내 프로필</span>
            <span className='col-2'>서비스에서 사용하는 내 계정 정보를 확인할 수 있습니다.</span>
          </div>
          <div className="row-2">
            <span className='col-1'>이름</span>
            <span className='col-2'>이병건</span>
          </div>
          <div className="row-3">
            <span className='col-1'>별명</span>
            <span className='col-2'>침착맨</span>
          </div>
        </MyProfileSection>
        <MyProfileSection>
        <div className="row-1">
            <span className='col-1'>계정 관리</span>
          </div>
          <div className="row-2">
            <span className='col-1' style={{color: '#616161', textDecorationLine: 'underline'}}>회원 탈퇴</span>
          </div>
          <div className="row-3">
            <span className='col-1' style={{color: '#616161'}}>로그아웃</span>
          </div>
        </MyProfileSection>
      </div>
    </TemplateEl>
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
  button {
    position: absolute;
    display: block;
    bottom: -12px;
    right: -3px;
    border-radius: 50%;
    border: none;
    background-color: #767676;
    width: 35px;
    height: 35px;
    padding: 0;
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
    .col-1 {
      color:#424242;
    }
    .col-2 {
      color: #616161;
    }
    &.row-1 {
      height: 78px;
      background-color: #F5F5F5;
      .col-1 {
        font-size: 2.4rem;
        color: #212121;
      }
      .col-2 {
        font-size: 1.8rem;
        color: #757575;
      }
    }
  }
`;

export default Page;
