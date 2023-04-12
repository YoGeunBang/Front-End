interface Window {
  adsbygoogle: any; // 구글 애드센스
  kakao: any; // 카카오
  naver: any;
  dataLayer: any; // 구글 GA 태그 매니저
}

interface RoomTypes {
  id: number;
  name: string;
  time: number;
  price: number;
  type: number;
  url: string;
  image: string[];
  checkin: number;
  checkout: number;
  lat?: number;
  lng?: number;
  address?: string;
  update?: string;
}

interface detailTypes {
  id: number;
  name: string;
  description: string;
  car: boolean;
  image: string;
  items: RoomTypes[];
}
interface regionTypes {
  id: number;
  name: string;
  open: boolean;
  image: string;
  banner: string;
  detail: detailTypes[];
}

interface userType {
  token: string | undefined;
  nickname: string | undefined;
  profile_img: string | undefined;
}
