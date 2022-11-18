import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SearchInput } from 'components/common';

const Header = () => {
  // header Dom class 제어를 위한 ref 선언
  const header = useRef<any>(null);
  const router = useRouter();
  const [roomsPage, setRoomsPage] = useState<boolean>(false);
  const [showHeader, setShowHeader] = useState<boolean>(true);

  useEffect(() => {
    if (router.pathname === '/[region_id]/[detail_id]') {
      setRoomsPage(true);
    } else setRoomsPage(false);
  });

  useEffect(() => {
    if (roomsPage) {
      window.addEventListener('scroll', isScroll);
    }
    return () => {
      window.removeEventListener('scroll', isScroll);
    };
  }, [roomsPage]);

  const isScroll = () => {
    if (window.pageYOffset >= 80) {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  };

  // useEffect(() => {
  //   if (isRoomPage) {
  //     // 3 페이지일 경우 scroll 이벤트에 따라 isScroll 함수 실행
  //     window.addEventListener('scroll', isScroll);
  //     // 3 페이지 탈출 시 해당 이벤트리스너 제거
  //     return () => {
  //       window.removeEventListener('scroll', isScroll);
  //     };
  //   } else {
  //     // 3 페이지가 아닐 경우 header ref 에 부여된 'scroll' 클래스 제거 (다른 페이지로 이동 시 헤더 display: none 되는 현상 방지)
  //     header.current.classList.remove('scroll');
  //   }
  // },[isRoomPage]);
  //   /** 3페이지 스크롤 Header on/off (display:none) 함수*/

  // const isScroll = () => {
  //   if (window.pageYOffset >= 80) {
  //     header.current.classList.add('scroll');
  //   } else {
  //     header.current.classList.remove('scroll');
  //   }
  // };
  return (
    <>
      {showHeader && (
        <HeaderEl ref={header}>
          <div className="container">
            <Link href="/">
              <a className="logo">
                <img src="/assets/img/logo.png" />
                <span style={{ padding: '0 0 10px 10px' }}>Beta</span>
              </a>
            </Link>
            {/* <SearchInput /> */}
          </div>
        </HeaderEl>
      )}
    </>
  );
};

// styled-components
const HeaderEl = styled.div`
  &.scroll {
    display: none;
  }
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  background-color: #fff;
  border-bottom: 1px solid #e5e5ec;
  padding: 0 12.5%;
  @media screen and (max-width: 480px) {
    padding: 0 4%;
  }
  .container {
    position: relative;
    justify-content: space-between;
    align-items: center;
    display: flex;
    height: 80px;
    .logo {
      position: relative;
      display: flex;
      align-items: end;
      font-size: 1.2rem;
      color: #aaa;
      width: 120px;
      img {
        display: block;
        width: 100%;
        object-fit: cover;
      }
    }
  }
`;

export default Header;
