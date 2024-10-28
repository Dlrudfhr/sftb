import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  [key: string]: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = sessionStorage.getItem("authenticated");
  const location = useLocation();

  // 사용자가 인증되지 않았고 현재 경로가 "/"가 아닐 경우에만 리다이렉션
  if (!isAuthenticated && location.pathname !== "/") {
    console.log("로그인되지 않은 사용자입니다."); // 콘솔 로그 추가
    return <Navigate to="/" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
