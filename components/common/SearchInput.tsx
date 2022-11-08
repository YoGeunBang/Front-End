import { useState } from 'react';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { changeSearchAction } from 'store/search';

const SearchInput = () => {
  const router = useRouter();
  // 검색창에 입력된 내용을 실시간으로 받아옴
  const [search, setSearch] = useState('');
  // input 값 state 로 변경

  const onChange = (e: any) => {
    if (e !== '') setSearch(e.target.value);
  };

  const searchClick = () => {
    router.push(`${`/search?keyword=${search}`}`)
    setSearch('');
  }
  
  return (
    <SearchInputEL>
      <input type="text" value={search} onChange={onChange} placeholder="검색" />
        <div onClick={searchClick} className="search-btn">
          <img src="assets/img/search.png"></img>
        </div>
    </SearchInputEL>
  );
};
const SearchInputEL = styled.div`
  position: relatve;
  display: flex;
  align-items: center;
  height: 45%;
  input {
    font-size: 1.5rem;
    padding: 10px 0;
    outline: none;
    border: none;
    border-bottom: 2px solid transparent;
    width: 50px;
    &:focus {
      width: 150px;
      transition: width 0.3s;
      border-bottom: 2px solid #00c2d6;
    }
  }
  .search-btn {
    width: 20px;
    height: 20px;
    background-color: transparent;
    border: none;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
export default SearchInput;
