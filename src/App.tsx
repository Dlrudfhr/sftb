import { Children, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DefaultLayout from "./pages/DefaultLayout";
import Store from './pages/Store';
import Information from "./pages/Information";

interface RouteProps {
  path: string;
  component: any;
  standalone?: boolean;
  anonymous?: boolean;
}

const routes: Array<RouteProps> = [
  {
    path: "/",
    component: <LoginPage />,
  },
  {
    path: "/main",
    component: <DefaultLayout children={undefined} />,
  },
  {
    path: "/store",
    component: <Store children={undefined} />,
    
  },
  {
    path: "/information",
    component: <Information children={undefined} />,
    
  },
];

function App(p0: unknown, p1: HTMLElement | null) {
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
