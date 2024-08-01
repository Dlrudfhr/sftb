import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./pages/DefaultLayout";
import Test from "./pages/Test";
import SiteIntroduce from "./pages/SiteIntroduce";
import RanKing from "./pages/RanKing";
import Announcement from "./pages/Announcement";
import Organization from "./pages/Organization";
import Inquiry from "./pages/Inquiry";

interface RouteProps {
  path: string;
  component: any;
  standalone?: boolean;
  anonymous?: boolean;
}

const routes: Array<RouteProps> = [
  {
    path: "/",
    component: (
      <DefaultLayout>
        <div></div>
      </DefaultLayout>
    ),
  },

  {
    path: "/Test",
    component: <Test />,
  },

  {
    path: "/SiteIntroduce",
    component: <SiteIntroduce />,
  },

  {
    path: "/RanKing",
    component: <RanKing />,
  },

  {
    path: "/Announcement",
    component: <Announcement />,
  },

  {
    path: "/Organization",
    component: <Organization />,
  },

  {
    path: "/Inquiry",
    component: <Inquiry />,
  },
];

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        {routes.map((route, idx) => (
          <Route path={route.path} element={<>{route.component}</>} key={idx} />
        ))}
      </Routes>
    </>
  );
}

export default App;
//
