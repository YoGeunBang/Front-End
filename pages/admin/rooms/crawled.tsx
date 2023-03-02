import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement } from 'react';
import * as S from 'styles/admin/index.style';

const Page: NextPageWithLayout = () => {
  return <S.Wrapper>숙소 크롤링 데이터 목록 입니다.</S.Wrapper>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};

export default Page;
