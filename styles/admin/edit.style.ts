import styled, { css } from 'styled-components';

export const FormWrapper = styled.div`
  font-size: 16px;
  margin-top: 80px;
  width: 100%;
  line-height: 150%;
  letter-spacing: -2%;
`;
export const InputRow = styled.div<{ rowCount: number }>`
  display: grid;
  grid-template-columns: ${({ rowCount }) => `repeat(${rowCount},1fr)`};
  gap: 16px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const InputCol = styled.div`
  width: 100%;
`;
export const RoomThumbnailUpload = styled.div`
  margin-bottom: 32px;
  input {
    display: none;
  }
  label > div {
    &:hover {
      cursor: pointer;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow:hidden;
    width: 100%;
    height: 550px;
    background-color: ${({ theme }) => theme.colors.blackColors.grey_50};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.blackColors.grey_400};
    font-weight: 500;
    font-size: 1.5rem;
    p {
      margin-top: 16px;
    }
    #room-thumbnail {
      width: 100%;
    }
  }
`;
export const InputItem = styled.div<{ required?: boolean }>`
  display: block;
  margin-bottom: 32px;
  width: 100%;
  .input-title {
    display: block;
    color: ${({ theme }) => theme.colors.blackColors.grey_900};
    font-weight: 900;
    margin-bottom: 16px;
    ${({ required }) =>
      required &&
      css`
        &::after {
          content: '*';
          padding-left: 4px;
          display: inline-block;
          color: ${({ theme }) => theme.colors.mainColor};
        }
      `};
  }
  .radio-group-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    div {
      label {
        margin-left: 16px;
      }
      &,
      input,
      label {
        cursor: pointer;
      }
    }
  }
  .room-image-upload {
    input {
      display: none;
    }
    > div {
      height: 410px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: dashed 1.5px ${({ theme }) => theme.colors.blackColors.grey_400};
      background-color: ${({ theme }) => theme.colors.blackColors.grey_50};
      div {
        margin-bottom: 27px;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          margin-bottom: 20px;
        }
      }

      .select-file-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.blackColors.grey_900};
        width: 238px;
        height: 48px;
        background-color: ${({ theme }) => theme.colors.blackColors.grey_300};
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
`;

export const SelectField = styled.select`
  font-family: 'Pretendard';
  border-radius: 4px;
  height: 40px;
  border: solid 1.5px ${({ theme }) => theme.colors.blackColors.grey_500};
  padding: 0 12px;
  outline: none;
  width: 100%;
  option {
    border-radius: 0;
    height: 40px;
  }
`;

export const InputField = styled.input`
  font-family: 'Pretendard';
  border-radius: 4px;
  height: 40px;
  border: solid 1.5px ${({ theme }) => theme.colors.blackColors.grey_500};
  padding: 0 12px;
  outline: none;
  width: 100%;
`;
export const InputTextarea = styled.textarea`
  font-family: 'Pretendard';
  border-radius: 4px;
  border: solid 1.5px ${({ theme }) => theme.colors.blackColors.grey_500};
  padding: 12px;
  outline: none;
  width: 100%;
  height: 122px;
  resize: none;
`;

export const AmenitiesCheckBoxGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
`;

export const AmenitiesCheckBox = styled.div`
  input[type='checkbox'] {
    display: none;
  }
  label {
    &:hover {
      cursor: pointer;
    }
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: ${({ theme }) => theme.colors.blackColors.grey_600};
    border-radius: 4px;
    border: solid 1.5px ${({ theme }) => theme.colors.blackColors.grey_300};
    div {
      height: 70%;
      display: flex;
      align-items: center;
      img {
        max-width: 134px;
        max-height: 134px;
        margin-bottom: 10px;
      }
    }
  }
  input:checked + label {
    border: solid 2px ${({ theme }) => theme.colors.mainColor};
    color: ${({ theme }) => theme.colors.mainColor};
    p {
      font-weight: 900;
    }
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 120px;
  width: 100%;
  justify-content: center;
`;
export const SubmitButton = styled.button`
  font-family: 'Pretendard';
  background-color: ${({ theme }) => theme.colors.mainColor};
  color: ${({ theme }) => theme.colors.blackColors.grey_900};
  font-weight: 500;
  font-size: 1.5rem;
  border-radius: 4px;
  border: none;
  width: 238px;
  height: 70px;
  outline: none;
  &:hover {
    cursor: pointer;
  }
`;
