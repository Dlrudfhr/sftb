import React from "react";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import "../assets/css/Information.css";

const Information: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header /> {/* 상단 배너 */}
      
      <>
      <div className="Information__frame">
        <div className="Information__innerframe">
          
        </div>
      </div>
      </>
      <Footer /> {/* 하단 배너 */}
    </div>
  );
};

export default Information;
