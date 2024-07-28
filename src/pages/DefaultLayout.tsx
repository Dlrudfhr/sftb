import react from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

interface LayoutProps {
  children: any;
}
const DefaultLayout = (props: LayoutProps) => {
  return (
    <>
      <div id="layout-wrapper">
        <Header />
        <Main />
        <div className="main-content">{props.children}</div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
