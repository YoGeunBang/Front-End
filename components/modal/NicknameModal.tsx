import styled from 'styled-components';
import { useState } from 'react';
const NicknameModal = ({ setIsOpenModal }: any) => {
  const [text, setText] = useState<string>('');
  const changeNickname = () => {
    console.log(text);
    setIsOpenModal(false);
  };
  return (
    <>
      <Bg onClick={() => setIsOpenModal(false)} />
      <Content>
        <h2>별명</h2>
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          size={10}
          maxLength={8}
        />
        <div>
          <button className="cancle" onClick={() => setIsOpenModal(false)}>
            취소
          </button>
          <button className="save" onClick={() => changeNickname()}>
            저장
          </button>
        </div>
      </Content>
    </>
  );
};

const Bg = styled.div`
  position: fixed;
  display: block;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 99999;
`;
const Content = styled.div`
  z-index: 99999;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  h2 {
    font-weight: 600;
    font-size: 28px;
    text-align: center;
    line-height: 150%;
    margin-bottom: 36px;
  }
  input {
    font-size: 16px;
    padding: 20px 16px;
    border: 1.5px solid #bdbdbd;
    border-radius: 8px;
    margin-bottom: 40px;
    outline: none;
  }
  > div {
    display: flex;
    gap: 16px;
    justify-content: end;
    > button {
      background-color: transparent;
      padding: 8px 16px;
      border: 1.5px solid #00c2d6;
      border-radius: 8px;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: #757575;
      &.save {
        color: #fff;
        background-color: #00c2d6;
      }
    }
  }
`;
export default NicknameModal;
