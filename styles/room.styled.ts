import styled from 'styled-components';

export const NavArea = styled.nav`
  position: fixed;
  top: 80px;
  display: block;
  z-index: 99999;
  width: 100%;
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #e5e5ec;
  .container {
    height: 100%;
  }
  .gnb {
    position: relative;
    display: flex;
    height: 100%;
    button {
      position: relative;
      border: 0;
      font-size: 1.6rem;
      color: #999;
      margin-right: 24px;
      white-space: nowrap;
      background-color: transparent;
      &::after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        display: block;
        width: 0;
        height: 3px;
        background-color: #fff;
        transition: 0.3s;
      }
      &.active {
        font-weight: bold;
        color: #000;
        &::after {
          width: 100%;
          background-color: #000;
        }
      }
    }
  }
`;
export const MainArea = styled.div`
  position: relative;
  padding: 104px 0 120px 0;
  min-height: calc(100vh - (228px));
  .container {
    .section-nav {
      z-index: 9999;
      position: fixed;
      top: 128px;
      &::before {
        content: '';
        position: fixed;
        left: 0;
        display: block;
        width: 100vw;
        height: 56px;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
      }
      ul {
        position: relative;
        display: flex;
        height: 56px;
        align-items: center;
        li {
          button {
            position: relative;
            display: block;
            padding: 7px 12px;
            border-radius: 4px;
            background-color: #e9e9ed;
            color: #999;
            font-size: 1.4rem;
            margin-right: 16px;
            opacity: 0.7;
            border: 0;
            &.active {
              background-color: #00c2d6;
              opacity: 1;
              color: #fff;
            }
          }
        }
      }
      @media screen and (max-width: 1024px) {
        ul,
        &::before {
          height: 48px;
        }
        li button {
          margin-right: 8px !important;
        }
      }
    }
    section {
      position: relative;
      padding-top: 150px;
      @media screen and (max-width: 1024px) {
        padding-top: 104px;
        padding-bottom: 56px;
        &::before {
          content: '';
          position: absolute;
          display: block;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          width: 100vw;
          height: 8px;
          background-color: #e9e9ed;
        }
        .distance {
          top: 56px !important;
        }
        &:last-child {
          padding-bottom: 0;
          &::before {
            content: none;
          }
        }
      }
      .distance {
        position: absolute;
        display: block;
        top: 80px;
        font-size: 2.8rem;
        font-weight: 600;
        b {
          color: #205cff;
        }
      }
      .card-wrap {
        position: relative;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 2.5%;
        grid-row-gap: 40px;
        @media screen and (max-width: 1024px) {
          grid-template-columns: repeat(2, 1fr);
        }
        .time {
          position: relative;
          font-size: 2.8rem;
          font-weight: 600;
        }
        img {
        }
      }
    }
  }
  .empty {
    position: absolute;
    display: block;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    text-align: center;

    span {
      position: relative;
      display: block;
      font-size: 2rem;
      color: #999;
    }
  }

  @media screen and (max-width: 1024px) {
      padding-top: 96px;
  }
  @media screen and (max-width: 480px) {
    .card-wrap {
      grid-template-columns: repeat(1, 1fr) !important;
    }
  }
  @media screen and (max-width: 390px) {
  }
`;
export const RoomListLayout = styled.div`
  margin-top: 80px;
  &.scroll {
    nav {
      top: 0;
    }
    .section-nav {
      top: 48px !important;
    }
  }
`;