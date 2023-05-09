import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import NicknameModal from 'components/modal/NicknameModal';
import { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { TemplateEl } from 'styles/detail.styled';
import { LogOutButton } from 'components/common';
import { deleteTokenAction } from 'store/token';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store';
import Router from 'next/router';
import { DeleteMemberApi } from 'lib/customAxios';

const Page: NextPageWithLayout = () => {
  const { nickname, profile_img } = useSelector((state: RootState) => state.token);
  const dispatch = useDispatch();
  const [imageSrc, setImageSrc] = useState<any>(profile_img);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const onUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null); // 파일의 컨텐츠
        resolve();
      };
    });
  };
  
  const deleteMember = async () => {
    let isDelete = confirm('정말로 탈퇴하시겠습니까?');
    if (isDelete) {
      try {
        const delete_res = await DeleteMemberApi();
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
              <img src={imageSrc ? imageSrc : '/assets/img/profile_default.svg'} alt="프로필이미지" />
              <input
                id="upload-btn"
                alt="프로필이미지수정버튼"
                accept="image/*"
                multiple
                type="file"
                onChange={(e) => onUpload(e)}
              />
              <label htmlFor="upload-btn">
                <img src="/assets/img/edit.svg" alt="프로필이미지수정버튼" />
              </label>
            </UserProfileImgArea>
            <span>{nickname}</span>
          </UserProfileArea>
          <MyProfileSection>
            <div className="row-1">
              <span className="col-1">내 프로필</span>
            </div>
            <div className="row-2">
              <span className="col-1" style={{ fontWeight: '400' }}>
                {nickname}
              </span>
              <button
                onClick={() => {
                  setIsOpenModal((current) =>!current);
                }}
              >
                <img src="/assets/img/arrow_right.png" alt="프로필닉네임수정버튼" />
              </button>
            </div>
          </MyProfileSection>
          <MyProfileSection>
            <div className="row-1">
              <span className="col-1">즐겨찾기</span>
            </div>
            <div className="row-2">
              <span className="col-1">좋아요 누른 숙소</span>
              <button>
                <img src="/assets/img/arrow_right.png" alt="" />
              </button>
            </div>
            <div className="row-2">
              <span className="col-1">최근에 본 숙소</span>
              <button>
                <img src="/assets/img/arrow_right.png" alt="" />
              </button>
            </div>
          </MyProfileSection>
          <MyProfileSection>
            <div className="row-1">
              <span className="col-1">계정 관리</span>
            </div>
            <div className="row-2">
              <span className="col-1" style={{ textDecoration: 'underline' }}>
                회원 탈퇴
              </span>
              <button>
                <img onClick={deleteMember} src="/assets/img/arrow_right.png" alt="회원탈퇴버튼" />
              </button>
            </div>
            <div className="row-2">
              <span className="col-1">로그아웃</span>
              <LogOutButton imgSrc="/assets/img/arrow_right.png" />
            </div>
          </MyProfileSection>
          {isOpenModal && <NicknameModal setIsOpenModal={setIsOpenModal} />}
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
    font-weight: 700;
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
    object-fit: cover;
  }
  > input {
    display: none;
  }
  > label {
    position: absolute;
    display: flex;
    cursor: pointer;
    bottom: 0;
    right: -16px;
    justify-content: center;
    border-radius: 50%;
    background-color: #9e9e9e;
    width: 40px;
    height: 40px;
    padding: 0;
    border: #fff solid 2px;
    img {
      width: 22px;
    }
  }
`;
const MyProfileSection = styled.section`
  position: relative;
  border-radius: 8px;
  box-shadow: 6px 12px 32px rgba(0, 0, 0, 0.08);
  font-size: 2rem;
  margin-bottom: 80px;

  > * {
    position: relative;
    display: flex;
    align-items: center;
    height: 72px;
    white-space: nowrap;
    padding: 0 3.75%;
    .col-2 {
      color: #616161;
    }
    &.row-1 {
      height: 78px;
      background-color: #f5f5f5;
      .col-1 {
        font-size: 2.4rem;
        font-weight: 600;
        color: #212121;
      }
    }
    &.row-2 {
      justify-content: space-between;
      font-weight: 500;
      .col-1 {
        color: #616161;
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
