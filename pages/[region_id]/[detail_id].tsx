import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState, useRef } from 'react';
import { AppLayout } from 'components/layout';
import { useRouter } from 'next/router';
import * as Room from '../../styles/room.styled'
import Data from 'data/data.json';
import { TiWarningOutline } from 'react-icons/ti';
import { Card } from 'components/common/room';
import { InfoModal } from 'components/modal';
import type { GetStaticProps, GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next';

export const getStaticPaths: GetStaticPaths = async () => {
  //const res = await axios.get('/api/rooms/list');
  // const data = res.data;
  const data = Data.region;

  const paths: any[] = [];
  data.forEach((region) => {
    region.detail.forEach((detailItem) => {
      paths.push({
        params: {
          region_id: region?.id?.toString(),
          detail_id: detailItem?.id?.toString(),
        },
      });
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

  const _isCar = _regionData?.detail?.find((detail) => {
    return detail.id === Number(_detail_id);
  })?.car;
  //const data = res?.data;
  return { props: { roomsData: _roomsData, isCar: _isCar } };
};

const Page: NextPageWithLayout = ({ roomsData, isCar }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const [originalItems, setOriginalItems] = useState<RoomTypes[]>([]); // 시간정렬 까지 된 오리진 데이터
  const [items, setItems] = useState<RoomTypes[]>([]); // 타입 별 숙소 출력 용
  const [type, setType] = useState<number>(0); // 숙박시설의 종류 (게하,모텔,호텔 등)
  const room = useRef<HTMLDivElement>(null);
  const sections = useRef<null[] | HTMLElement[]>([]);
  const sections_nav = useRef<null[] | HTMLElement[]>([]);
  let open = true; // 해당 여행지 숙소 정보 등록 유무

  // 숙소 전체목록이 0개 일 시 준비 중
  //   else if (type === 0 && roomsData.length === 0) {
  //     open = false;
  //   }

  const isActive = (_num: number) => {
    if (_num === type) {
      return true;
    } else {
      return false;
    }
  };

  /** 시간별 구분 -> 가격순으로 재정렬 후 map으로 jsx 로 반환  */
  const distance_5 = items
    ?.filter((item: RoomTypes) => item.time <= 5)
    .sort((a: RoomTypes, b: RoomTypes) => {
      return a.price - b.price;
    })
    .map((item: RoomTypes) => <Card item={item} key={item.id} />);

  const distance_10 = items
    ?.filter((item: RoomTypes) => item.time > 5 && item.time <= 10)
    .sort((a: RoomTypes, b: RoomTypes) => {
      return a.price - b.price;
    })
    .map((item: RoomTypes) => <Card item={item} key={item.id} />);

  const distance_15 = items
    ?.filter((item: RoomTypes) => item.time > 10 && item.time >= 15)
    .sort((a: RoomTypes, b: RoomTypes) => {
      return a.price - b.price;
    })
    .map((item: RoomTypes) => <Card item={item} key={item.id} />);

  /** 도보 거리 별 섹션 스크롤 진입 함수 */
  const isScroll = () => {
    // current 배열에서 null 제거해주는 작업 진행 해야할 듯..!
    sections.current.forEach((element: Element | null, index: number) => {
      if (element != null) {
        if (50 > element.getBoundingClientRect().top) {
          sections_nav.current[index]?.classList.add('active');
        } else if (50 <= element.getBoundingClientRect().top) {
          sections_nav.current[index]?.classList.remove('active');
        }
        if (50 > element.getBoundingClientRect().bottom) {
          sections_nav.current[index]?.classList.remove('active');
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
    const _items = roomsData?.sort((a: RoomTypes, b: RoomTypes) => {
      return a.time - b.time;
    });

    setOriginalItems(_items);
    setItems(_items);
  }, [router.isReady]);

  useEffect(() => {
    if (type !== 0) {
      setItems(
        originalItems.filter((item: RoomTypes) => {
          return item.type === type;
        }),
      );
    } else {
      setItems(originalItems);
    }
  }, [type, originalItems]);

  return (
    <>
      <Room.RoomListLayout ref={room}>
        <Room.NavArea className="template">
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
          </Room.NavArea>
        <Room.MainArea className='template'>
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
                            if (sections.current[0]) {
                              window.scrollTo({
                                top: window.pageYOffset + sections.current[0].getBoundingClientRect().top - 48,
                                behavior: 'smooth',
                              });
                            }
                          }}
                          ref={(section_nav) => (sections_nav.current[0] = section_nav)}
                        >
                          {isCar ? '차량' : '도보'} 5분 내
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            if (sections.current[1]) {
                              window.scrollTo({
                                top: window.pageYOffset + sections.current[1].getBoundingClientRect().top - 48,
                                behavior: 'smooth',
                              });
                            }
                          }}
                          ref={(section_nav) => (sections_nav.current[1] = section_nav)}
                        >
                          {isCar ? '차량' : '도보'} 6~10분 내
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            if (sections.current[2]) {
                              window.scrollTo({
                                top: window.pageYOffset + sections.current[2].getBoundingClientRect().top - 48,
                                behavior: 'smooth',
                              });
                            }
                          }}
                          ref={(section_nav) => (sections_nav.current[2] = section_nav)}
                        >
                          {isCar ? '차량' : '도보'} 11~15분 내
                        </button>
                      </li>
                    </ul>
                  </div>

                  <section ref={(section) => (sections.current[0] = section)}>
                    <h2 className="distance">
                      {isCar ? '차량' : '도보'} <b>5분</b> 내 위치 숙소
                    </h2>
                    <div className="card-wrap">{distance_5}</div>
                  </section>

                  <section ref={(section) => (sections.current[1] = section)}>
                    <h2 className="distance">
                      {isCar ? '차량' : '도보'} <b>10분</b> 내 위치 숙소
                    </h2>
                    <div className="card-wrap">{distance_10}</div>
                  </section>

                  <section ref={(section) => (sections.current[2] = section)}>
                    <h2 className="distance">
                      {isCar ? '차량' : '도보'} <b>15분</b> 내 위치 숙소
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
        </Room.MainArea>
      </Room.RoomListLayout>
      {isCar && <InfoModal />}
    </>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
