import type { NextPageWithLayout } from 'pages/_app';
import { ReactElement, useEffect, useState } from 'react';
import { AppLayout } from 'components/layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Detail from '../../styles/detail.styled'
import Data from 'data/data.json';

// json 타입
// type regionTypes = typeof Data.region[0];

const Page: NextPageWithLayout = () => {
  const router = useRouter();
  const [regionData, setRegionData] = useState<regionTypes>();
  const { region_id } = router.query;

  useEffect(() => {
    // region_id 를 사용해서 data.json을 읽어오면 된다.
    let data: any = Data.region[Number(region_id) - 1];
    setRegionData(data);
  }, [router.isReady]);
  return (
    <Detail.TemplateEl className="Template">
      {regionData && (
        <div className="detail">
          <div className="container">
            <div className="detail-name">
              <img src={regionData?.banner} alt="여행지이미지" />
              <h1>{regionData?.name}</h1>
            </div>
            <div className="detail-main">
              <h2 className="title">인기있는 관광지에요</h2>
              <div className="card-wrap">
                {regionData?.detail?.map((_detail: detailTypes) => {
                  return (
                    <Link href={`/${regionData.id}/${_detail?.id}`} key={_detail?.id}>
                      <a className="card">
                        <img src={_detail?.image} alt="여행지이미지" />
                        <div className="card-txt">
                          <h2 className="card-title">{_detail?.name}</h2>
                          <p className="card-desc">{_detail?.description}</p>
                        </div>
                      </a>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </Detail.TemplateEl>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};


export default Page;
