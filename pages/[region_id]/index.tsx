import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { AppLayout } from 'components/layout';
import Link from 'next/link';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Data from 'data/data.json';

// json 타입
// type regionTypes = typeof Data.region[0];

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const [regionData, setRegionData] = useState<regionTypes>();
  const { region_id } = router.query;

  useEffect(() => {
    // region_id 를 사용해서 data.json을 읽어오면 된다.
    let data:any = Data.region[Number(region_id) - 1]
    setRegionData(data);
  }, [router.isReady]);
  return (
    <TemplateEl className="Template">
      {regionData && (
        <div className="detail">
          <div className="detail-name">
            <div className="container">
              <div>
                <img src={regionData?.banner} alt="여행지이미지" />
                <h1>{regionData?.name}</h1>
              </div>
            </div>
          </div>
          <div className="detail-main">
            <div className="container">
              <h2 className="title">인기있는 관광지에요</h2>
              <div className="card-wrap">
                {regionData?.detail?.map((_detail: detailTypes) => {
                  return (
                    <Link href={`/${regionData.id}/${_detail?.id}`} key={_detail?.id}>
                      <a className="card">
                        <img src={_detail?.image} alt="여행지이미지" />
                        <div className="card-txt">
                          <h2 className="card-title">{_detail?.name}</h2>
                          <p className="card-desc">{_detail?.description}</p>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </TemplateEl>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

// styled-components
const TemplateEl = styled.div`
  padding-top: 80px;
  padding-bottom: 10%;
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
  .detail {
    .detail-name {
      position: relative;
      display: block;
      overflow: hidden;
      width: 100%;
      height: 200px;
      padding: 0 12.5%;
      .container {
        height: 100%;
        > div {
          position: relative;
          height: 100%;
          clip-path: inset(0);
        }
        img {
          position: fixed;
          left: 50%;
          height: 200px;
          transform: translateX(-50%);
        }
        h1 {
          position: absolute;
          left: 32px;
          bottom: 32px;
          display: block;
          font-size: 3.6rem;
          color: #fff;
        }
      }
    }
    .detail-main {
      padding: 0 12.5%;
      .title {
        position: relative;
        margin-top: 6.25%;
        font-size: 2.8rem;
        margin-bottom: 2.5%;
      }
      .card-wrap {
        font-size: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 40px;
        .card {
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 5px 10px 30px -5px #ddd;
          border: 1px solid #f0f0f6;
          display: flex;
          height: 144px;
          img {
            position: relative;
            width: 40%;
            flex: none;
          }
          .card-txt {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 5%;
            .card-title {
              position: relative;
              font-size: 2rem;
              margin-bottom: 10%;
            }
            .card-desc {
              font-size: 1.6rem;
              word-break: keep-all;
              color: #767676;
              font-family: 'Pretendard-Regular';
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .detail-name {
      height: 140px !important;
      img {
        height: 140px !important;
      }
    }
    .detail {
      .detail-main {
        .card-wrap {
          grid-template-columns: repeat(2, 1fr);
          .card {
            height: 126px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    .detail-name {
      height: 120px !important;
      padding: 0 !important;
    }
    .detail {
      .detail-main {
        padding: 0 4%;
        .card-wrap {
          grid-template-columns: repeat(1, 1fr);
          grid-row-gap: 20px;
          .card {
            height: 110px;
          }
        }
      }
    }
  }
`;
export default Page;
