import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DefaultLayout from "./pages/DefaultLayout";
import StoreGreen from "./pages/StoreGreen";
import StoreRed from "./pages/StoreRed";
import StoreYellow from "./pages/StoreYellow";
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
import PostWrite from "./pages/PostPage/PostWrite";
import PostDetail from "./pages/PostPage/PostDetail";
import PostAdopt from "./pages/PostPage/PostAdopt"; // PostAdopt 페이지 import
import PrivateRoute from "./PrivateRoute";
import PostAnnouncement from "./pages/PostAnnouncement";
import MyWrittenPost from "./pages/PostPage/MyWrittenPost";
import MyWrittenComm from "./pages/PostPage/MyWrittenComm";
import MyBookmark from "./pages/PostPage/MyBookmark";

import "./App.css";

interface RouteProps {
  path: string;
  component: React.ComponentType<any>;
  standalone?: boolean;
  anonymous?: boolean;
}

const routes: Array<RouteProps> = [
  { path: "/", component: LoginPage, anonymous: true },
  { path: "/storeGreen", component: StoreGreen },
  { path: "/storeRed", component: StoreRed },
  { path: "/storeYellow", component: StoreYellow },
  { path: "/information", component: Information },
  { path: "/signup", component: SignUpPage, anonymous: true },
  { path: "/SearchIdPage", component: SearchIdPage, anonymous: true },
  { path: "/SearchPwPage", component: SearchPwPage, anonymous: true },
  { path: "/Main", component: DefaultLayout },
  { path: "/main/SiteIntroduce", component: SiteIntroduce },
  { path: "/main/RanKing", component: RanKing },
  { path: "/main/Announcement", component: Announcement },
  { path: "/main/Organization", component: Organization },
  { path: "/main/Inquiry", component: Inquiry },
  { path: "/Certificate", component: Certificate },
  { path: "/QnA", component: QnA },
  { path: "/Share", component: Share },
  { path: "/Mentor_mentee", component: Mentor_mentee },
  { path: "/Project", component: Project },
  { path: "/Coding", component: Coding },
  { path: "/Marketplace", component: Marketplace },
  { path: "/Ledger", component: Ledger },
  { path: "/FreePost", component: FreePost },
  { path: "/PostWrite", component: PostWrite },
  { path: "/PostDetail/:postId", component: PostDetail },
  { path: "/PostAdopt/:postId", component: PostAdopt }, // 추가된 PostAdopt 경로
  { path: "/PostAnnouncement/:postId", component: PostAnnouncement },
  { path: "/MyWrittenPost", component: MyWrittenPost},
  { path: "/MyWrittenComm", component: MyWrittenComm},
  { path: "/MyBookmark", component: MyBookmark},
];

function App() {
  return (
    <Routes>
      {routes.map((route, idx) => {
        if (route.anonymous) {
          return (
            <Route path={route.path} element={<route.component />} key={idx} />
          );
        } else {
          return (
            <Route
              path={route.path}
              element={<PrivateRoute component={route.component} />}
              key={idx}
            />
          );
        }
      })}
    </Routes>
  );
}

export default App;
