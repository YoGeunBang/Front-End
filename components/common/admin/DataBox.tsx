import { useState, useCallback, useEffect } from 'react';
import Data from 'data/mock.json';
import styled from 'styled-components';
import Pagination from './Pagination';
const DataBox = () => {
  const mock = Data.region[0].detail[0].items;
  const [page, setPage] = useState(1); // 현재 페이지 위치
  const [limit, setLimit] = useState(11); // 한 페이지에 나타낼 데이터 개수
  const offset = (page - 1) * limit; // 뿌려줄 데이터의 시작지점
  const data_list_slice = mock.slice(offset, offset + limit); // 현재 페이지에 맞는 데이터 자르기
  const [checkedList, setCheckedLists] = useState<number[]>([]);

  const dataListSlice_JSX = data_list_slice.map((item: RoomTypes, i: number) => {
    return (
      <Item key={i}>
        <input
          type="checkbox"
          name="data-item"
          id={`check-${i}`}
          value={i}
          onChange={(e) => onCheckedElement(e.target.checked, Number(e.target.value))}
          checked={checkedList.includes(i) ? true : false}
        />
        <label htmlFor={`check-${i}`}></label>
        <span id="item-name">{item.name}</span>
        <span id="item-type">
          {item.type == 1 && '호텔'}
          {item.type == 2 && '펜션'}
          {item.type == 3 && '모텔'}
          {item.type == 4 && '게스트하우스'}
        </span>
        <span id="item-update">{item.update}</span>
      </Item>
    );
  });

  console.log(checkedList);
  // 전체 체크 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        // checked == true ? 모든 아이템들의 키 값을 아이템 체크 배열에 저장
        const checkedListArray: number[] = [];
        dataListSlice_JSX.forEach((item) => checkedListArray.push(Number(item.key)));
        setCheckedLists(checkedListArray);
      } else {
        // checked == false ? 아이템 체크 배열 초기화하여 모두 체크 해제
        setCheckedLists([]);
      }
    },
    [dataListSlice_JSX],
  );

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = useCallback(
    (checked: boolean, value: number) => {
      if (checked) {
        setCheckedLists([...checkedList, value]);
      } else {
        setCheckedLists(checkedList.filter((el) => el !== value));
      }
    },
    [checkedList],
  );
  // 페이지가 변경될 경우 (페이지네이션 이동) 체크 박스 초기화
  useEffect(() => {
    setCheckedLists([]);
  }, [page]);

  return (
    <>
      <SettingBox>
        <FillterBox>
          <select>
            <option value="all">전체보기</option>
            <option value="1">호텔</option>
            <option value="2">펜션</option>
            <option value="3">모텔</option>
          </select>
          <img src="/assets/img/admin/dropdown.svg" />
        </FillterBox>
        <ControlBox>
          <button>추가</button>
          <button>삭제</button>
        </ControlBox>
      </SettingBox>
      <DataList>
        <Item className="table-head">
          <input
            type="checkbox"
            id="check-head"
            name="data-item"
            value="yyy"
            onChange={(e) => onCheckedAll(e.target.checked)}
            checked={checkedList.length === 0 ? false : checkedList.length === dataListSlice_JSX.length ? true : false}
          />
          <label htmlFor="check-head"></label>
          <span id="item-name">숙소 이름</span>
          <span id="item-type">숙소 타입</span>
          <span id="item-update">업데이트 날짜</span>
        </Item>
        {dataListSlice_JSX}
      </DataList>
      <Pagination total={mock.length} limit={limit} page={page} setPage={setPage} />
    </>
  );
};
const SettingBox = styled.div`
  position: relative;
  @media screen and (max-width: 1024px) {
    margin-left: 7.5%;
  }
`;
const FillterBox = styled.div`
  position: relative;
  display: inline-block;
  margin-top: 28px;
  font-size: 1.6rem;
  select {
    position: relative;
    padding: 8px 40px 8px 23px;
    border: 1.5px solid #9e9e9e;
    border-radius: 4px;
    color: #424242;
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    &select::-ms-expand {
      display: none;
    }
    z-index: 2;
  }
  img {
    position: absolute;
    top: 50%;
    right: 11px;
    transform: translateY(-50%);
    z-index: 1;
  }
`;
const ControlBox = styled.div`
  position: absolute;
  right: 56px;
  bottom: 0;
  button {
    border: 1.5px solid #9e9e9e;
    padding: 8px 18px;
    background-color: transparent;
    border-radius: 4px;
    & + button {
      margin-left: 10px;
    }
  }
`;
const DataList = styled.div`
  position: relative;
  padding-top: 64px;
`;

const Item = styled.div`
  margin-left: 7.5%;
  display: flex;
  border-bottom: 1px solid #e0e0e0;
  height: 56px;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 400;
  color: #616161;
  input[type='checkbox'] {
    display: none;
  }
  input[type='checkbox'] + label {
    display: block;
    width: 18px;
    height: 18px;
    border: 2px solid #e0e0e0;
    margin-left: 2.5%;
    margin-right: 3.75%;
    position: relative;
    border-radius: 4px;
  }
  input[id='check-head'] + label {
    border-color: #212121;
  }
  input[type='checkbox']:checked + label::after {
    content: '✔';
    font-size: 20px;
    color: #00c2d6;
    width: 18px;
    height: 18px;
    text-align: center;
    position: absolute;
    left: 0;
    top: -4px;
  }
  &.table-head {
    color: #212121;
  }
  input {
    width: 7.5%;
  }
  #item-name {
    position: relative;
    display: block;
    width: 45%;
  }
  #item-type {
    width: 25%;
  }
  #item-update {
    white-space: nowrap;
  }
`;
export default DataBox;
