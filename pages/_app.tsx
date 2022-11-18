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
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push('js', new Date());
    window.dataLayer.push('config', 'G-77F6696QSE');
  }, []);
  return getLayout(<Component {...pageProps} />);
}

export default wrapper.withRedux(MyApp);
