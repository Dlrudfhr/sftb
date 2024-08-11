import { Children, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DefaultLayout from "./pages/DefaultLayout";
import Store from "./pages/Store";
import Information from "./pages/Information";
import SiteIntroduce from "./pages/SiteIntroduce";
import RanKing from "./pages/RanKing";
import Announcement from "./pages/Announcement";
import Organization from "./pages/Organization";
import Inquiry from "./pages/Inquiry";
import Certificate from "./pages/PostPage/Certificate";
import QnA from "./pages/PostPage/QnA";
import Share from "./pages/PostPage/Share";
import Mentor_mentee from "./pages/PostPage/Mentor_mentee";
import Project from "./pages/PostPage/Project";
import Coding from "./pages/PostPage/Coding";
import Marketplace from "./pages/PostPage/Marketplace";
import Ledger from "./pages/PostPage/Ledger";
import FreePost from "./pages/PostPage/FreePost";
import SignUpPage from "./pages/SignUpPage";
import SearchIdPage from "./pages/SearchIdPage";
import SearchPwPage from "./pages/SearchPwPage";

interface RouteProps {
  path: string; //경로를 나타내는 문자열
  component: any; //컴포넌트를 나타내는 문자열
  standalone?: boolean; //선택적으로 standalone 여부를 나타내는 불리언 값
  anonymous?: boolean; //선택적으로 익명 여부를 나타내는 불리언 값
}

const routes: Array<RouteProps> = [
  //RouteProps 배열을 정의 const:변수를 상수화 시키는 키워드, 상수란 변하지 않는 값 처음 선언할 때만 값을 할당할 수 있으며 그 다음부터는 값을 바꿀 수 없다.
  { path: "/", component: <LoginPage /> },
  { path: "/store", component: <Store children={undefined} /> },
  { path: "/information", component: <Information children={undefined} /> },
  {
    path: "/SignUp",
    component: (
      <SignUpPage
        onSubmit={function (): void {
          new Error("Function not implemented.");
        }}
      />
    ),
  },
  { path: "/Main", component: <DefaultLayout children={undefined} /> },
  { path: "/SearchIdPage", component: <SearchIdPage /> },
  { path: "/SearchPwPage", component: <SearchPwPage /> },
  { path: "/main/SiteIntroduce", component: <SiteIntroduce /> },
  { path: "/main/RanKing", component: <RanKing /> },
  { path: "/main/Announcement", component: <Announcement /> },
  { path: "/main/Organization", component: <Organization /> },
  { path: "/main/Inquiry", component: <Inquiry /> },
  { path: "/Certificate", component: <Certificate /> },
  { path: "/QnA", component: <QnA /> },
  { path: "/Share", component: <Share /> },
  { path: "/Mentor_mentee", component: <Mentor_mentee /> },
  { path: "/Project", component: <Project /> },
  { path: "/Coding", component: <Coding /> },
  { path: "/Marketplace", component: <Marketplace /> },
  { path: "/Ledger", component: <Ledger /> },
  { path: "/FreePost", component: <FreePost /> },
];

function App(p0: unknown, p1: HTMLElement | null) {
  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        {" "}
        {/*Routes 컴포넌트를 사용하여*/}
        {routes.map(
          (
            route,
            idx //routes 배열을 매핑하고 각 요소를 렌더링한다.
          ) => (
            <Route
              path={route.path}
              element={<>{route.component}</>}
              key={idx}
            />
          )
        )}
      </Routes>
    </>
    // <BrowserRouter>
    //   <Switch>
    //     <Route exact path="/" component={Main}/>
    //     <Route path="/post" component={PostPage}/>
    //   </Switch>
    // </BrowserRouter>
  );
}

export default App;
//
