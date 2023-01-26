import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import styled from 'styled-components';
import Data from 'data/data.json';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillLock } from 'react-icons/ai';

const Page: NextPageWithLayout = () => {
  const region_list = Data.region;

  const region_JSX = region_list.map((_region, i) =>
    _region.open ? (
      <Link href={`/${_region.id}`} key={i}>
        <a className="card">
          <img src={_region.image} alt="여행지이미지" />
          <div className="card-title">
            <span>{_region.name}</span>
            <IoIosArrowForward size="20" />
          </div>
        </a>
      </Link>
    ) : (
      <div className="card not" key={_region.id}>
        <img src={_region.image} alt="여행지이미지" />
        <AiFillLock size="50" color="#ededed" />
        <div className="card-title">
          <span>Comming Soon</span>
        </div>
      </div>
    ),
  );

  return (
    <TemplateEl className="template">
      <div className="main">
        <div className="container">
          <h2 className="title">어디로 떠나세요?</h2>
          <div className="card-wrap">{region_JSX}</div>
        </div>
      </div>
    </TemplateEl>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// styled-components
const TemplateEl = styled.div`
  padding-top: 80px;
  @keyframes UP {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  .main {
    padding: 6.25% 12.5%;
    .title {
      position: relative;
      font-size: 2.8rem;
      margin-bottom: 2.5%;
    }
    .card-wrap {
      position: relative;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-column-gap: 2%;
      grid-row-gap: 40px;
      .card {
        position: relative;
        display: block;
        border-radius: 8px;
        overflow: hidden;
        animation: UP 1s;
        img {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .card-title {
          position: absolute;
          display: flex;
          align-items: center;
          background-color: rgba(0, 0, 0, 0.5);
          width: 100%;
          font-size: 2rem;
          height: 25%;
          bottom: 0;
          color: #fff;
          padding-left: 10%;
          z-index: 999;
        }
        svg {
          margin-left: 10px;
        }
        &.not {
          &::before {
            content: '';
            position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            z-index: 99;
            background-color: rgba(0, 0, 0, 0.4);
          }
          svg {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            margin: 0;
            z-index: 999;
          }
          img {
            filter: blur(4px);
            -webkit-filter: blur(4px);
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .card-wrap {
      grid-template-columns: repeat(3, 1fr) !important;
      grid-row-gap: 50px;
    }
  }
  @media screen and (max-width: 768px) {
    .card-wrap {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media screen and (max-width: 480px) {
    .main {
      padding: 6.25% 4% !important;
      .card-wrap {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  }
`;

export default Page;
