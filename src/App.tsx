import { Children, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import DefaultLayout from "./pages/DefaultLayout";



interface RouteProps {
  path: string; //경로를 나타내는 문자열
  component: any; //컴포넌트를 나타내는 문자열
  standalone?: boolean; //선택적으로 standalone 여부를 나타내는 불리언 값
  anonymous?: boolean;  //선택적으로 익명 여부를 나타내는 불리언 값
}

const routes: Array<RouteProps> = [   //RouteProps 배열을 정의 const:변수를 상수화 시키는 키워드, 상수란 변하지 않는 값 처음 선언할 때만 값을 할당할 수 있으며 그 다음부터는 값을 바꿀 수 없다.
  {
    path: "/",
    component: <LoginPage />,
  },
  {
    path: "/main",
    component: <DefaultLayout children={undefined} />,
  },
];

function App(p0: unknown, p1: HTMLElement | null) {
  useEffect(() => {}, []);

  return (
    <>
      <Routes> {/*Routes 컴포넌트를 사용하여*/}
        {routes.map((route, idx) => ( //routes 배열을 매핑하고 각 요소를 렌더링한다.
          <Route path={route.path} element={<>{route.component}</>} key={idx} />
        ))}
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
