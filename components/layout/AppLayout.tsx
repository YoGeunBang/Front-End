import { Header, GoTop, AdBanner, Footer } from 'components/common';
const AppLayout = (props: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <GoTop />
      {props.children}
      <AdBanner />
      <Footer />
    </>
  );
};

export default AppLayout;
