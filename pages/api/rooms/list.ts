import data from 'data/data.json';
import type { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  if (req.method === 'GET') {
    try {
      const { test, region_id, detail_id } = req.query;
      if (test === 'test') {
        const paths: any[] = [];
        data.region.forEach((region: any) => {
          region.detail.forEach((detailItem: any) => {
            paths.push({ params: { region_id: region?.id?.toString(), detail_id: detailItem?.id?.toString() } });
          });
        });
        res.status(200).json(paths);
      } else if (region_id === undefined) {
        res.status(200).json(data.region);
      } else {
        if (detail_id === undefined) {
          const _regionData = data?.region?.find((region) => {
            return region.id === Number(region_id);
          });
          res.status(200).json(_regionData);
        } else {
          const _regionData = data?.region?.find((region) => {
            return region.id === Number(region_id);
          });
          const _roomsData = _regionData?.detail?.find((detail) => {
            return detail.id === Number(detail_id);
          })?.items;
          res.status(200).json(_roomsData);
        }
      }
    } catch (err: any) {
      // try 실패시, 에러코드(500) 응답(res)하고, json형식으로 에러 메시지 출력
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  }
};

export default handler;
