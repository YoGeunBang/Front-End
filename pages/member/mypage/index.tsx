import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement } from 'react';
import styled from 'styled-components';

const Page: NextPageWithLayout = () => {
  return <MypageEl>마이페이지 입니다만..?</MypageEl>;
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
const MypageEl = styled.div`
  padding: 80px 12.5% 10% 12.5%;
  position: relative;
  min-height: calc(100vh - 150px);
  display: block;
`;
export default Page;
