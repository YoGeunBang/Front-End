import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { IoIosArrowRoundUp } from 'react-icons/io';

const GoTop = () => {
  // 버튼에 class 부여하기 위한 state
  const [onOff, setOnOff] = useState<boolean>(false);

  useEffect(() => {
    // scroll 이 감지되면 handler 함수 실행
    window.addEventListener('scroll', handler);
  });

  const handler = () => {
    if (window.pageYOffset > 200) {
      setOnOff(true);
    } else {
      setOnOff(false);
    }
  };

  const onClick = () => {
    // 클릭하면 스크롤이 위로 올라가는 함수
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setOnOff(false); // onOff의 값을 false로 바꿈 => 버튼 숨김
  };
  return (
    <GoTopEl className={onOff ? 'active' : ''}>
      <button
        className="gotop"
        onClick={onClick} // 버튼 클릭시 함수 호출
      >
        <IoIosArrowRoundUp size="30" />
      </button>
    </GoTopEl>
  );
};
// styled-components
const GoTopEl = styled.div`
  position: fixed;
  z-index: 999;
  bottom: 3rem;
  right: 3rem;
  display: block;
  visibility: hidden;
  &.active {
    visibility: visible;
  }
  button {
    position: relative;
    display: block;
    border: 0;
    border-radius: 50%;
    width: 48px;
    height: 48px;
    background-color: #fff;
    filter: drop-shadow(2px 4px 15px rgba(0, 0, 0, 0.2));
    opacity: 0;
    transition: 0.3s;
    svg {
    }
  }
  &.active button {
    opacity: 1;
  }
`;

export default GoTop;
