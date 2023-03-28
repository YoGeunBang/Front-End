import Data from 'data/mock.json';
import styled from 'styled-components';
const DataBox = () => {
  const mock = Data.region[0].detail[0].items;
  return (
    <>
      <SettingBox>
        <FillterBox>
          <select>
            <option value="all">전체보기</option>
            <option value="1">1 보기</option>
            <option value="2">2 보기</option>
            <option value="3">3 보기</option>
          </select>
          <img src="/assets/img/admin/dropdown.svg" />
        </FillterBox>
        <ControlBox>
          <button>추가</button>
          <button>삭제</button>
        </ControlBox>
      </SettingBox>
      <DataList>
        
      </DataList>
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
padding-left: 108px;
`;
export default DataBox;
