import '../styles/globals.css';
import type { AppProps } from 'next/app';
import type { NextPage } from 'next';
import { wrapper } from 'store';
import { ReactElement, ReactNode, useEffect } from 'react';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    // window.dataLayer = window.dataLayer || [];
    // window.dataLayer.push('js', new Date());
    // window.dataLayer.push('config', 'G-77F6696QSE');

    (function (w: any, d: any, s: any, l: any, i: any) {
      w[l] = w[l] || [];
      w[l].push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js',
      });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != 'dataLayer' ? '&l=' + l : '';
      j.async = true;
      j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, 'script', 'dataLayer', 'GTM-5GVT87H');
  }, []);
  return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
