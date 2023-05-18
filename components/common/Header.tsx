import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { LogInButton } from 'components/common';
import { useSelector } from 'react-redux';
import { RootState } from 'store';
import Profile from './Profile';

const Header = () => {
  const router = useRouter();
  const { isLogined, profile_img } = useSelector((state: RootState) => state.user);
  const [isLoginedState, setIsLoginedState] = useState(false);
  const [hideHeader, setHideHeader] = useState<boolean>(false);
  
  const isScroll = () => {
    if (window.pageYOffset >= 80) {
      setHideHeader(true);
    } else {
      setHideHeader(false);
    }
  };
  useEffect(() => {
    setIsLoginedState(isLogined);
  }, []);

  useEffect(() => {
    if (router.pathname === '/[region_id]/[detail_id]') {
      window.addEventListener('scroll', isScroll);
    }
    return () => {
      window.removeEventListener('scroll', isScroll);
    };
  }, [router.pathname]);
  return (
    <HeaderEl className={`template ${hideHeader ? 'hide' : ''}`}>
      <div className="container">
        <Link href="/">
          <a className="logo">
            <img src="/assets/img/logo.png" />
            <span style={{ padding: '0 0 10px 10px' }}>Beta</span>
          </a>
        </Link>
        {/* <SearchInput /> */}
        {isLoginedState ? <Profile profile_img={profile_img} /> : <LogInButton />}
      </div>
    </HeaderEl>
  );
};

// styled-components
const HeaderEl = styled.div`
  &.hide {
    display: none;
  }
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99999;
  background-color: #fff;
  border-bottom: 1px solid #e5e5ec;
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
