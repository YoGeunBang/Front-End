import { useState } from 'react';
import Data from 'data/mock.json';
import styled from 'styled-components';
import Pagination from './Pagination';
const DataBox = () => {
  const mock = Data.region[0].detail[0].items;
  const [limit, setLimit] = useState(11);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const data_list = mock.map((item: RoomTypes) => {
    return (
      <Item>
        <input type="checkbox" name="xxx" value="yyy" />
        <span id="item-name">{item.name}</span>
        <span id="item-type">
          {item.type == 1 && '호텔'}
          {item.type == 2 && '펜션'}
          {item.type == 3 && '모텔'}
          {item.type == 4 && '게스트하우스'}
        </span>
        <span className="item-update">{item.update}</span>
      </Item>
    );
  });

  return (
    <>
      <SettingBox>
        <FillterBox>
          <select>
            <option value="all">전체보기</option>
            <option value="1">호텔</option>
            <option value="2">펜션</option>
            <option value="3">모텔</option>
            <option value="3">게스트하우스</option>
          </select>
          <img src="/assets/img/admin/dropdown.svg" />
        </FillterBox>
        <ControlBox>
          <button>추가</button>
          <button>삭제</button>
        </ControlBox>
      </SettingBox>
      <DataList>
        <Item className='table-head'>
          <input type="checkbox" name="xxx" value="yyy" />
          <span id="item-name">숙소 이름</span>
          <span id="item-type">숙소 타입</span>
          <span className="item-update">업데이트 날짜</span>
        </Item>
        {data_list.slice(offset, offset + limit)}
      </DataList>
      <Pagination total={data_list.length} limit={limit} page={page} setPage={setPage} />
    </>
  );
};
const SettingBox = styled.div`
  position: relative;
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
  font-weight: 500;
  color: #616161;
  &.table-head {
    color: #212121;
  }
  input {
    width: 7.5%;
  }
  #item-name {
    position: relative;
    display: block;
    width: 22.5%;
  }
  #item-type {
    width: 37.5%;
  }
  #item-update {
  }
`;
export default DataBox;
