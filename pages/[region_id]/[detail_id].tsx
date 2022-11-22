import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState, useRef } from 'react';
import { AppLayout } from 'components/layout';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Data from 'data/data.json';
import { TiWarningOutline } from 'react-icons/ti';
import { Card } from 'components/common/room';
import axios from 'pages/api/customAxios';
import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  //const res = await axios.get('/api/rooms/list');
  // const data = res.data;
  const data = Data.region;
  const paths: any[] = [];
  data.forEach((region: any) => {
    region.detail.forEach((detailItem: any) => {
      paths.push({ params: { region_id: region?.id?.toString(), detail_id: detailItem?.id?.toString() } });
    });
  });
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }: GetStaticPropsContext) => {
  /*
  const res = await axios.get('/api/rooms/list', {
    params: { detail_id: params?.detail_id, region_id: params?.region_id },
  });
  */
  const _region_id = params?.region_id;
  const _detail_id = params?.detail_id;
  const _regionData = Data?.region?.find((region) => {
    return region.id === Number(_region_id);
  });
  const _roomsData = _regionData?.detail?.find((detail) => {
    return detail.id === Number(_detail_id);
  })?.items;
  //const data = res?.data;
  return { props: { data: _roomsData }, revalidate: 2 };
};

const Page: NextPageWithLayout = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { region_id, detail_id } = router.query;
  const [originalItems, setOriginalItems] = useState<any>(null); // 시간정렬 까지 된 오리진 데이터
  const [items, setItems] = useState<any>(null); // 타입 별 숙소 출력 용
  const [type, setType] = useState<number>(0); // 숙박시설의 종류 (게하,모텔,호텔 등)
  const room = useRef<any>(null);
  const sections = useRef<any[]>([]);
  const sections_nav = useRef<any[]>([]);
  let open = true; // 해당 여행지 숙소 정보 등록 유무

  // 숙소 전체목록이 0개 일 시 준비 중
  //   else if (type === 0 && roomsData.length === 0) {
  //     open = false;
  //   }

  const isActive = (_num: any) => {
    if (_num === type) {
      return true;
    } else {
      return false;
    }
  };

  /** 시간별 구분 -> 가격순으로 재정렬 후 map으로 jsx 로 반환  */
  const distance_5 = items
    ?.filter((item: any) => item.time <= 5)
    .sort((a: any, b: any) => {
      return parseFloat(a.price) - parseFloat(b.price);
    })
    .map((item: any) => <Card item={item} key={item.id} />);

  const distance_10 = items
    ?.filter((item: any) => item.time > 5 && item.time <= 10)
    .sort((a: any, b: any) => {
      return parseFloat(a.price) - parseFloat(b.price);
    })
    .map((item: any) => <Card item={item} key={item.id} />);

  const distance_15 = items
    ?.filter((item: any) => item.time > 10 && item.time >= 15)
    .sort((a: any, b: any) => {
      return parseFloat(a.price) - parseFloat(b.price);
    })
    .map((item: any) => <Card item={item} key={item.id} />);

  /** 도보 거리 별 섹션 스크롤 진입 함수 */
  const isScroll = () => {
    // current 배열에서 null 제거해주는 작업 진행 해야할 듯..!
    sections.current.forEach((element: any, index: number) => {
      if (element != null) {
        if (50 > element.getBoundingClientRect().top) {
          sections_nav.current[index].classList.add('active');
        } else if (50 <= element.getBoundingClientRect().top) {
          sections_nav.current[index].classList.remove('active');
        }
        if (50 > element.getBoundingClientRect().bottom) {
          sections_nav.current[index].classList.remove('active');
        }
      }
    });
    // room 컴포넌트가 80 만큼 스크롤 되었을 때 room 컴포넌트에 scroll 클래스 추가
    if (window.pageYOffset >= 80) {
      room?.current?.classList.add('scroll');
    } else {
      room?.current?.classList.remove('scroll');
    }
    // 절대좌표 구하기 현재 스크롤된 좌표 + 뷰 포트 내 해당 dom y 좌표 !!!
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    window.addEventListener('scroll', isScroll);
    return () => {
      window.removeEventListener('scroll', isScroll);
    };
  }, []);

  useEffect(() => {
    const _items = data?.sort((a: any, b: any) => {
      return parseFloat(a.time) - parseFloat(b.time);
    });

    setOriginalItems(_items);
    setItems(_items);
  }, [router.isReady]);

  useEffect(() => {
    if (type !== 0) {
      setItems(
        originalItems.filter((item: any) => {
          return item.type === type;
        }),
      );
    } else {
      setItems(originalItems);
    }
  }, [type, originalItems]);

  return (
    <>
      <RoomListLayout ref={room}>
        <nav className="nav">
          <div className="container">
            <div className="gnb">
              <button
                className={isActive(0) ? 'active' : ''}
                onClick={() => {
                  setType(0);
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                전체
              </button>
              <button
                className={isActive(1) ? 'active' : ''}
                onClick={() => {
                  setType(1);
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                호텔
              </button>
              <button
                className={isActive(2) ? 'active' : ''}
                onClick={() => {
                  setType(2);
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                펜션
              </button>
              <button
                className={isActive(3) ? 'active' : ''}
                onClick={() => {
                  setType(3);
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                모텔
              </button>
              <button
                className={isActive(4) ? 'active' : ''}
                onClick={() => {
                  setType(4);
                  window.scrollTo({
                    top: 0,
                  });
                }}
              >
                게스트하우스
              </button>
            </div>
          </div>
        </nav>

        <div className="main">
          {open ? (
            items &&
            (items.length !== 0 ? (
              items && (
                <div className="container">
                  <div className="section-nav">
                    <ul>
                      <li>
                        <button
                          onClick={() => {
                            window.scrollTo({
                              top: window.pageYOffset + sections.current[0].getBoundingClientRect().top - 48,
                              behavior: 'smooth',
                            });
                          }}
                          ref={(section_nav) => (sections_nav.current[0] = section_nav)}
                        >
                          {items.car ? '차량' : '도보'} 5분 내
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            window.scrollTo({
                              top: window.pageYOffset + sections.current[1].getBoundingClientRect().top - 48,
                              behavior: 'smooth',
                            });
                          }}
                          ref={(section_nav) => (sections_nav.current[1] = section_nav)}
                        >
                          {items.car ? '차량' : '도보'} 6~10분 내
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            window.scrollTo({
                              top: window.pageYOffset + sections.current[2].getBoundingClientRect().top - 48,
                              behavior: 'smooth',
                            });
                          }}
                          ref={(section_nav) => (sections_nav.current[2] = section_nav)}
                        >
                          {items.car ? '차량' : '도보'} 11~15분 내
                        </button>
                      </li>
                    </ul>
                  </div>

                  <section ref={(section) => (sections.current[0] = section)}>
                    <h2 className="distance">
                      {items.car ? '차량' : '도보'} <b>5분</b> 내 위치 숙소
                    </h2>
                    <div className="card-wrap">{distance_5}</div>
                  </section>

                  <section ref={(section) => (sections.current[1] = section)}>
                    <h2 className="distance">
                      {items.car ? '차량' : '도보'} <b>10분</b> 내 위치 숙소
                    </h2>
                    <div className="card-wrap">{distance_10}</div>
                  </section>

                  <section ref={(section) => (sections.current[2] = section)}>
                    <h2 className="distance">
                      {items.car ? '차량' : '도보'} <b>15분</b> 내 위치 숙소
                    </h2>
                    <div className="card-wrap">{distance_15}</div>
                  </section>
                </div>
              )
            ) : (
              <div className="empty">
                <TiWarningOutline size="100" color="#aaa" />
                <span>근방에 존재하는 숙소가 없습니다</span>
              </div>
            ))
          ) : (
            <div className="empty">
              <TiWarningOutline size="100" color="#aaa" />
              <span>준비 중 입니다 !</span>
            </div>
          )}
        </div>
      </RoomListLayout>
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const RoomListLayout = styled.div`
  margin-top: 80px;
  &.scroll {
    nav {
      top: 0;
    }
    .section-nav {
      top: 48px !important;
    }
  }
  nav {
    position: fixed;
    top: 80px;

    display: block;
    z-index: 99999;
    width: 100%;
    padding: 0 12.5%;
    height: 48px;
    background-color: #fff;
    border-bottom: 1px solid #e5e5ec;
    @media screen and (max-width: 480px) {
      padding: 0 4%;
    }
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
  }
  // ------------------------------------------main -----------------------------------------
  .main {
    position: relative;
    padding: 104px 12.5% 120px 12.5%;
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
          font-family: 'Pretendard-Bold';
          font-size: 2.8rem;
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
            font-family: 'Pretendard-ExtraBold';
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
      padding: 96px 4%;
      .card-wrap {
        grid-template-columns: repeat(1, 1fr) !important;
      }
    }
    @media screen and (max-width: 390px) {
    }
  }
`;
export default Page;
