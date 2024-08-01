import { useEffect } from "react";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "./pages/DefaultLayout";
import PostPage from './pages/PostPage';


interface RouteProps {
  path: string; //경로를 나타내는 문자열
  component: any; //컴포넌트를 나타내는 문자열
  standalone?: boolean; //선택적으로 standalone 여부를 나타내는 불리언 값
  anonymous?: boolean;  //선택적으로 익명 여부를 나타내는 불리언 값
}

const routes: Array<RouteProps> = [   //RouteProps 배열을 정의 const:변수를 상수화 시키는 키워드, 상수란 변하지 않는 값 처음 선언할 때만 값을 할당할 수 있으며 그 다음부터는 값을 바꿀 수 없다.
  {
    path: "/",  //경로가 "/"인 경우
    component: (  //해당 컴포넌트를 렌더링 한다
      <DefaultLayout> {/*DefaultLayout 컴포넌트를 감싸고 */}
        <div></div> {/*빈 div를 렌더링 한다 */}
      </DefaultLayout>
    ),
  },
];

function App() {  //App 컴포넌트를 정의
  useEffect(() => {}, []);  //빈 배열을 의존성 배열로 사용하는 useEffect 훅이다.

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
