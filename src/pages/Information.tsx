import React from "react";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import "../assets/css/Information.css";

const Information: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header /> {/* 상단 배너 */}
      <h1> 내 정보</h1>
      <Footer /> {/* 하단 배너 */}
    </div>
  );
};

export default Information;
