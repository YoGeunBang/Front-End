import styled from 'styled-components';

export const Wrapper = styled.div` 
`
export const CardWrapper = styled.div`
  width: 100%;
  display: grid;
  margin-top:65px;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 40px;
  @media screen and (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    .card {
      height: 126px;
    }
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
    grid-row-gap: 20px;
    .card {
      height: 110px;
    }
  }
`;

export const TitleWrapper = styled.div`
  position: relative;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 200px;
  clip-path: inset(0);
  img {
    left: 50%;
    width: 100%;
    height: 240px;
    position: fixed;
    object-fit: cover;
    transform: translateX(-50%);
  }
  h1 {
    position: absolute;
    left: 32px;
    bottom: 32px;
    display: block;
    font-size: 3.6rem;
    color: #fff;
  }
`;