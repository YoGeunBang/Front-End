import { DefaultTheme } from 'styled-components'; // 기본 테마 설정을 위해서

const fontSize = {
  header_1: '44px',
  header_2: '36px',
  header_3: '32px',
  header_4: '28px',
  header_5: '24px',
  subtitle_1: '20px',
  subtitle_2: '18px',
  body_1: '16px',
  body_2: '14px',
  caption: '12px',
};

const colors = {
  mainColor: '#00C2D6',
  naverGreen: '#03C75A',
  textColor: '#212121',
};

export type ColorsTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;

/* 타입스크립트에서 DefaultTheme를 사용하려면 interface를 선언해주어야 한다. 아니면 theme가 any타입으로 나오게 된다. */
declare module 'styled-components' {
  export interface DefaultTheme {
    // 여기에 적용하고 싶은 속성과 타입을 정의한다
    fontSize: FontSizeTypes;
    colors: ColorsTypes;
  }
}

export const theme: DefaultTheme = {
  colors,
  fontSize,
};

export default theme;
