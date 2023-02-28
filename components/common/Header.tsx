import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LogInButton,LogOutButton } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

const Header = () => {
  const router = useRouter();
  
  const { token } = useSelector((state: RootState) => state.token);
  useEffect(() => {
    console.log(token);
    if(token) {
      console.log(token);
    }
  }, [token]);
  // header Dom class 제어를 위한 ref 선언
  const header = useRef<HTMLDivElement | null>(null);
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

  return (
    <HeaderEl ref={header}>
      {showHeader && (
        <div className="container">
          <Link href="/">
            <a className="logo">
              <img src="/assets/img/logo.png" />
              <span style={{ padding: '0 0 10px 10px' }}>Beta</span>
            </a>
          </Link>
          {/* <SearchInput /> */}
          {token ? <LogOutButton/>: <LogInButton />}
          
        </div>
      )}
    </HeaderEl>
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
