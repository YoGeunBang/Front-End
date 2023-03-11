import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }
  
  render() {
    return (
      <Html>
        <Head>
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1919598055512436"
            crossOrigin="anonymous"
          ></script>
          
          <title>요근방ㅣ관광지 근처 숙소를 한 눈에</title>
          <meta
            name="description"
            content="뚜벅이들을 위한 숙소 추천 서비스! 관광지 도보 15분내 숙소를 쉽게 찾아보세요."
          />
          <meta
            name="keywords"
            content="요근방,여행,숙소,숙박시설,도보,근처,제주도,성산일출봉,이중섭거리,섭지코지,중문관광단지,올레시장,곽지해수욕장,한담해변,협재해수욕장,금능해수욕장펜션,게하,게스트하우스,호텔,모텔,콘도,풀빌라"
          />
          <meta name="og:site_name" content="요근방ㅣ관광지 근처 숙소를 한 눈에" />
          <meta name="og:title" content="요근방ㅣ관광지 근처 숙소를 한 눈에" />
          <meta
            name="og:description"
            content="뚜벅이들을 위한 숙소 추천 서비스! 관광지 도보 15분내 숙소를 쉽게 찾아보세요."
          />
          {/* 구글 사이트 소유 확인 */}
          <meta name="google-site-verification" content="oY6hZ6xzO2_T9yWvvuI73zsyxWcIGSVKdaYzaYfoqCU" />
          {/* 네이버 사이트 소유 확인 */}
          <meta name="naver-site-verification" content="29e8927cdec26b5fcbaf5ab0250ee94a0545ae02" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
