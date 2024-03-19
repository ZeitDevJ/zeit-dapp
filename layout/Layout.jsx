import Footer from "./Footer";
import AppLayout from "./AppLayout";

const Layout = ({ children }) => {
  return (
    <>
      <AppLayout />
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
