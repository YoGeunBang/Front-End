import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { AppLayout } from 'components/layout';
import Link from 'next/link';
import Data from 'data/data.json';
import { Card } from 'components/common/room';
import { BsArrowRight } from "react-icons/bs";

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const { keyword }: any = router.query;

  // region(지역별) 배열 내에서 검색
  const searchRegion = Data.region.filter((it) => new RegExp(keyword, 'i').test(it.name));

  // detail(관광지별) 배열 내에서 검색
  let searchDetail: any[] = [];
  for (let i = 0; i < Data.region.length; i++) {
    /** region 배열 내 여행지에서 검색어가 포함된 name 의 배열을 찾아 detail 에 저장 */
    let detail = Data.region[i].detail.filter((it) => new RegExp(keyword, 'i').test(it.name));
    if (detail.length != 0) searchDetail = [...detail];
  }

  // detail 내에 items(숙소) 배열 내에서 검색
  let searchRoom = [];
  for (let i = 0; i < Data.region.length; i++) {
    /** region 배열 내 여행지에서 검색어가 포함된 name 의 배열을 찾아 detail 에 저장 */
    for (let j = 0; j < Data.region[i].detail.length; j++) {
      let room = Data.region[i].detail[j].items.filter((it) => new RegExp(keyword, 'i').test(it.name));
      if (room.length != 0) searchRoom.push(room);
    }
  }
  searchRoom = searchRoom.flat();

  return (
    <SearchEL>
      <div className="container">
        {/* keyword 의 값이 없을 경우 대비 */}
        {keyword != '' ? (
          <h1>
            <span className="keyword">'{keyword}'</span> 에 대한 검색 결과
          </h1>
        ) : (
          <h1>검색어를 입력해주세요 !</h1>
        )}

        <SearchContent>
          <div>
            <h2>
              지역<span className="keyword">{`${searchRegion.length}`}</span>
            </h2>
            <ResultWrap>
              {searchRegion.map(function (result, index) {
                let regionRoom = [];
                for (let i = 0; i < result.detail.length; i++) {
                  regionRoom.push(result.detail[i].items);
                }
                regionRoom = regionRoom.flat();
                return (
                  <Link href={'/1123'} key={index}>
                    <a className="result-item">
                      <h2>{result.name}</h2>
                      <p>
                        <span className="keyword">{regionRoom.length}</span> 개의 숙소가 존재합니다.
                      </p>
                    </a>
                  </Link>
                );
              })}
            </ResultWrap>
          </div>
          <div>
            <h2>
              관광지<span className="keyword">{`${searchDetail.length}`}</span>
            </h2>
            <ResultWrap>
              {searchDetail.map(function (result, index) {
                {
                  console.log(result.items);
                }
                return (
                  <Link href={'/1123'} key={index}>
                    <a className="result-item">
                      <h2>{result.name}</h2>
                      <p>
                        <span className="keyword">{result.items.length}</span> 개의 숙소가 존재합니다.
                      </p>
                    </a>
                  </Link>
                );
              })}
            </ResultWrap>
          </div>
          
          <div>
            <h2>
              숙소<span className="keyword">{`${searchRoom.length}`}</span>
            </h2>
            <ResultWrap className="room-result">
              {searchRoom.slice(0, 3).map((preview, index) => (
                <Card item={preview} key={index} />
              ))}
              {searchRoom.length > 3 ? (
                <Link href={'/123'}>
                  <a className="moveRoom-btn tb">
                    <span>숙소 더 보기</span>
                    <BsArrowRight />
                  </a>
                </Link>
              ) : (
                ''
              )}
            </ResultWrap>
            {searchRoom.length > 3 ? (
              <Link href={'/123'}>
                <a className="moveRoom-btn">
                <span>숙소 더 보기</span>
                <BsArrowRight />
                </a>
              </Link>
            ) : (
              ''
            )}
          </div>
        </SearchContent>
      </div>
    </SearchEL>
  );
};
Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

const SearchEL = styled.div`
  padding: 80px 12.5% 10% 12.5%;
  position: relative;
  min-height: calc(100vh - 150px);
  display: block;
  color: #888;
  .keyword {
    color: #00c2d6;
  }
  h1 {
    margin: 3%;
    font-size: 1.2rem;
  }
  .moveRoom-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    width: 100%;
    height: 50px;
    font-size: 1.8rem;
    color: #555;
    background-color: transparent;
    font-weight: normal;
    &.tb {
      display: none;
      width: 100%;
      height: 100%;
    }
  }
  @media screen and (max-width: 1024px) and (min-width: 480px) {
    .moveRoom-btn {
      display: none;
      &.tb {
        display: flex;
      }
    }
  }
  @media screen and (max-width: 480px) {
    padding: 80px 4%;
  }
`;
const SearchContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  h2 {
    .keyword {
      margin-left: 10px;
      font-size: 1.2rem;
    }
  }
`;

const ResultWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: max-content;
  align-items: center;
  justify-content: center;
  grid-row: 1;
  grid-column-gap: 2.5%;
  grid-row-gap: 40px;
  padding: 3% 3% 5% 3%;
  color: #000;
  .result-item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 80px;
    padding: 0 8%;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    > h2 {
      font-size: 1.8rem;
    }
    > p {
      word-break: keep-all;
      color: #888;
    }
  }
  &.room-result {
    padding: 3% 0 3% 0;
    @media screen and (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 1024px) {
    &.room-result {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    grid-row-gap: 10px;
    &.room-result {
      grid-row-gap: 30px;
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default Page;
