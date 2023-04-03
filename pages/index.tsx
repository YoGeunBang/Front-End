import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement } from 'react';
import { AppLayout } from 'components/layout';
import Data from 'data/data.json';
import Link from 'next/link';
import { IoIosArrowForward } from 'react-icons/io';
import { AiFillLock } from 'react-icons/ai';
import * as Main from '../styles/index.styled'
import axios from 'axios';

const Page: NextPageWithLayout = () => {
  const region_list = Data.region;
  // const BACKEND_URL =
  //   process.env.NODE_ENV === 'development'
  //     ? 'https://cors-anywhere.herokuapp.com/https://ygb.server.swygbro.com/regions/0/spots'
  //     : 'https://ygb.server.swygbro.com/regions/0/spots';
  // axios.get(BACKEND_URL).then((res)=> {
  //   console.log(res);
  // })
  const region_JSX = region_list.map((_region, i) =>
    _region.open ? (
      <Link href={`/${_region.id}`} key={i}>
        <a className="card">
          <img src={_region.image} alt="여행지이미지" />
          <div className="card-title">
            <span>{_region.name}</span>
            <IoIosArrowForward size="20" />
          </div>
        </a>
      </Link>
    ) : (
      <div className="card not" key={_region.id}>
        <img src={_region.image} alt="여행지이미지" />
        <AiFillLock size="50" color="#ededed" />
        <div className="card-title">
          <span>Comming Soon</span>
        </div>
      </div>
    ),
  );

  return (
    <Main.TemplateEl className="template">
      <div className="container">
        <h2 className="title">어디로 떠나세요?</h2>
        <div className="card-wrap">{region_JSX}</div>
      </div>
    </Main.TemplateEl>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};


export default Page;
