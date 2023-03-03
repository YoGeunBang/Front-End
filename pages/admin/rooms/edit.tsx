import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout, AdminLayout } from 'components/layout';
import { ReactElement } from 'react';
import * as S from 'styles/admin/index.style';

const Page: NextPageWithLayout = () => {
  return <S.Wrapper>숙소 등록 / 숙소 수정 / 임시저장 수정 및 등록 입니다.</S.Wrapper>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AppLayout>
      <AdminLayout>{page}</AdminLayout>
    </AppLayout>
  );
};

export default Page;
