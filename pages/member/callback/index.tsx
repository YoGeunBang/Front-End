import type { NextPageWithLayout } from 'pages/_app';
import { AppLayout } from 'components/layout';
import { ReactElement } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useRouter } from 'next/router';

const Page: NextPageWithLayout = () => {
  let naverLogin: any;
  const router = useRouter();
  const { token_id } = router.query;
  console.log(naverLogin); // 사용자 정보 조회
  console.log(token_id);
  
  // await axios.get('https://openapi.naver.com/v1/nid/me', {
  //   headers: {
  //     Authorization: ,
  //   },
  // }).then((response) => {console.log(response)});

  return <MypageEl>콜백페이지 입니다만..?</MypageEl>;
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
