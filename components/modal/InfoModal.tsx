import styled from 'styled-components';
import { CgDanger } from 'react-icons/cg'
import { useState } from 'react';
const InfoModal = () => {
  const [ close, setClose] = useState(false);
  return (
    <>
      <BgLayout className={close ? '' : 'on'}></BgLayout>
      <ModalLayout className={close ? '' : 'on'}>
        <CgDanger size={40}/>
        <span>제주 공항은 차량 소요 시간으로 숙소를 추천드리며</span>
        <span>교통량에 따라 소요 시간이 상이할 수 있습니다.</span>
        <button onClick={() => setClose(true)}>확인</button>
      </ModalLayout>
    </>
  );
};
const BgLayout = styled.div`
  position: fixed;
  z-index: 99999;
  top:0;
  left: 0;
  display: none;
  &.on {
    display: block;
  }
  width: 100vw;
  height: 100vh;
  background-color: #000;
  opacity:.5;
`;
const ModalLayout = styled.div`
  position: fixed;
  &.on {
    display: flex;
  }
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  top: 50%;
  left: 50%;
  width: 50%;
  max-width: 400px;
  transform: translate(-50%, -50%);
  height: 250px;
  border-radius: 10px;
  background-color: #F7F7FB;
  svg {
    margin-bottom: 20px;
  }
  span {
    display: block;
    color: #555;
    font-size: 1.4rem;
    & + span {
      margin-top: 10px;
      margin-bottom: 30px;
    }
  }
  button {
    position: absolute;
    display: block;
    bottom: 25px;
    border: none;
    background-color: transparent;
    color: #00c2d6;
    font-size: 1.5rem;
  }
`;
export default InfoModal;
