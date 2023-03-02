import styled from 'styled-components';

// styled-components
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
  .detail {
    .detail-name {
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
    }
    .detail-main {
      .title {
        position: relative;
        margin-top: 6.25%;
        font-size: 2.8rem;
        margin-bottom: 2.5%;
      }
      .card-wrap {
        font-size: 1rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 20px;
        grid-row-gap: 40px;
        .card {
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 5px 10px 30px -5px #ddd;
          border: 1px solid #f0f0f6;
          display: flex;
          height: 144px;
          img {
            position: relative;
            width: 40%;
            flex: none;
          }
          .card-txt {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 5%;
            .card-title {
              position: relative;
              font-size: 2rem;
              margin-bottom: 10%;
            }
            .card-desc {
              font-size: 1.6rem;
              word-break: keep-all;
              color: #767676;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 1024px) {
    .detail-name {
      height: 140px !important;
      img {
        height: 200px !important;
      }
    }
    .detail {
      .detail-main {
        .card-wrap {
          grid-template-columns: repeat(2, 1fr);
          .card {
            height: 126px;
          }
        }
      }
    }
  }
  @media screen and (max-width: 480px) {
    .detail-name {
      height: 120px !important;
      padding: 0 !important;
    }
    .detail {
      .detail-main {
        .card-wrap {
          grid-template-columns: repeat(1, 1fr);
          grid-row-gap: 20px;
          .card {
            height: 110px;
          }
        }
      }
    }
  }
`;
