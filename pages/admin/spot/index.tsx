/* 관리자 페이지 - 관광지 관리 페이지 */
import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, AdminLayout } from 'components/layout';
import { ReactElement } from 'react';
import * as S from 'styles/admin/index.style';

const Page: NextPageWithLayout = () => {
  return <S.Wrapper>관리자 페이지 - 관광지 관리 페이지 입니다.</S.Wrapper>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <AdminLayout>{page}</AdminLayout>
    </AppLayout>
  );
};

export default Page;
