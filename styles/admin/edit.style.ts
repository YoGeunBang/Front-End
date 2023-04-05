import styled, { css } from 'styled-components';

export const FormWrapper = styled.div`
  font-size: 16px;
  margin-top: 80px;
  width: 100%;
  line-height: 150%;
  letter-spacing: -2%;
`;
export const InputRow = styled.div`
  width: 100%;
`;
export const InputCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
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
    width: 100%;
    height: 550px;
    background-color: ${({ theme }) => theme.colors.blackColors.grey_50};
    border-radius: 8px;
    color: ${({ theme }) => theme.colors.blackColors.grey_400};
    font-weight: 500;
    font-size: 1.5rem;
    img {
      margin-bottom: 16px;
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
export const InputField = styled.input`
  font-family: 'Pretendard';
  border-radius: 4px;
  height: 40px;
  border: solid 1.5px ${({ theme }) => theme.colors.blackColors.grey_500};
  padding-left: 12px;
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
  @media (max-width: 720px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 8px;
  }
`;

export const AmenitiesCheckBox = styled.div`
  input[type='checkbox'] {
    display: none;
  }
  label {
    height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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
