import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, AdminLayout } from 'components/layout';
import { DataBox } from 'components/common/admin'
import { ReactElement } from 'react';
import styled from 'styled-components';
import * as S from 'styles/admin/index.style';

const Page: NextPageWithLayout = () => {
  return (
    <S.Wrapper>
      <div className="container">
        <Title>크롤링 데이터</Title>
        <DataBox />
      </div>
    </S.Wrapper>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <AdminLayout>{page}</AdminLayout>
    </AppLayout>
  );
};

const Title = styled.h2`
  font-size: 2.8rem;
  font-weight: bold;
  @media screen and (max-width: 1024px) {
    margin-left: 7.5%;
  }
`;

export default Page;
