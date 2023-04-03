import { Header, GoTop, AdBanner, Footer, Session } from 'components/common';
const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Session />
      <Header />
      <GoTop />
      {props.children}
      <AdBanner />
      <Footer />
    </>
  );
};

export default AppLayout;
