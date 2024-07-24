import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import DefaultLayout from "./pages/DefaultLayout";

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
