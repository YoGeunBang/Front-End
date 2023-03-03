import styled from 'styled-components';

export const TemplateEl = styled.div`
  padding-top: 80px;
  @keyframes UP {
    0% {
      opacity: 0;
      transform: translateY(30px);
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  .container {
    margin-top: 6.25vh;
    margin-bottom: 6.25vh;
  }
  .title {
    position: relative;
    font-size: 2.8rem;
    margin-bottom: 2.5%;
    font-weight: 600;
  }
  .card-wrap {
    position: relative;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 2%;
    grid-row-gap: 40px;
    .card {
      position: relative;
      display: block;
      border-radius: 8px;
      overflow: hidden;
      animation: UP 1s;
      img {
        position: relative;
        width: 100%;
        height: 100%;
      }
      .card-title {
        position: absolute;
        display: flex;
        align-items: center;
        background-color: rgba(0, 0, 0, 0.5);
        width: 100%;
        font-size: 2rem;
        height: 25%;
        bottom: 0;
        color: #fff;
        padding-left: 10%;
        z-index: 999;
      }
      svg {
        margin-left: 10px;
      }
      &.not {
        &::before {
          content: '';
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          z-index: 99;
          background-color: rgba(0, 0, 0, 0.4);
        }
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          margin: 0;
          z-index: 999;
        }
        img {
          filter: blur(4px);
          -webkit-filter: blur(4px);
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .card-wrap {
      grid-template-columns: repeat(3, 1fr) !important;
      grid-row-gap: 50px;
    }
  }
  @media screen and (max-width: 768px) {
    .card-wrap {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
  @media screen and (max-width: 480px) {
    .main {
      padding: 6.25% 4% !important;
      .card-wrap {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  }
`;
