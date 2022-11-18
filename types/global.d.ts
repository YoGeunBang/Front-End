interface Window {
  adsbygoogle: any; // 구글 애드센스
  kakao: any; // 카카오
  dataLayer: any; // 구글 GA 태그 매니저
}

interface RoomType {
  id:number;
  name:string;
  time:number;
    price: number;
    lat:number;
    lng: number;
    url: string;
    image: string[];
    checkin:number;
    checkout:number;
}

