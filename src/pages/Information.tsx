import React from "react";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import "../assets/css/Information.css";

const Information: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Header /> {/* 상단 배너 */}
      
      <>
      <div className="Information">
        <div className="Information__frame">
          <div className="Information__innerframe">
            <div className="Information__userbox">
              <div className="Information__userImage"><img></img></div>
              <div className="Information__user">
                <div className="Information__userInfo">로그인한 사용자 이름</div>
                <div className="Information__progressBar">
                  <div className="Information__tier">사용자 티어</div>
                  <div className="Information__level">사용자 레벨</div>
                </div>
              </div>
              
            </div>
            
            <div className="Information__postbox">
              <div className="Information__mypost">작성한 글</div>
              <div className="Information__mypost">북마크 한 글</div>
              <div className="Information__mypost">좋아요한 글</div>
            </div>
          </div>
        </div>
      </div>
      </>
      <Footer /> {/* 하단 배너 */}
    </div>
  );
};

export default Information;
