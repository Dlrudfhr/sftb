import react from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useRef} from "react";
import {FcCollapse } from "react-icons/fc";

interface LayoutProps {
  children: any;
}


const DefaultLayout = (props: LayoutProps) => {
  const highElement = useRef<null | HTMLDivElement>(null); //상단으로 돌아가기 버튼

  //버튼 클릭시 ref를 받아와 요소로 이동하는 스크롤 이벤트
  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    window.scrollTo({ behavior: "smooth", top:0 });
  };

  return (
    <>
      <div id="layout-wrapper" ref={highElement}>
        <Header />
        <Main />
        <div className="main-content">{props.children}</div>
        {/*위로가기 버튼 */}
        <div className="Main_high">
          <button type="button" onClick={() => onMoveBox(highElement)}>
            <FcCollapse />
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default DefaultLayout;
