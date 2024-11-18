import React, { useEffect, useState } from 'react';
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from 'axios';
import "../assets/css/Information.css";

const Information: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const userId = localStorage.getItem("memberId");
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/auth/users/info`, {
          params: { userId: userId },
        });
        console.log(response.data);
        setUser(response.data); // 사용자 정보를 상태에 저장
      } catch (error) {
        console.error("Error fetching user:", error);
      } 
    };

    fetchUserInfo();
  }, []); // userId가 변경될 때마다 호출

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
                <div className="Information__userInfo">NAME: 사용자 이름{user.userName}</div>
                <div className="Information__userInfo">학번:</div>
                <div className="Information__userInfo">TIER: 사용자 티어</div>
                <div className="Information__userInfo">LEVEL: 사용자 레벨</div>
                <div className="Information__userInfo">성과금:</div> 
                <div className="Information__userInfo">EMAIL:</div>
                
              </div>
              {/* <div className="Information__userInfo">이메일</div>
              <div className="Information__userInfo"></div> */}
            </div>
            
            <div className="Information__postbox">
              <div className="Information__mypost" onClick={() => (window.location.href = "/MyWrittenPost")}>작성한 글 </div>
              <div className="Information__mypost" onClick={() => (window.location.href = "/MyBookmark")}>북마크 한 글</div>
              <div className="Information__mypost" onClick={() => (window.location.href = "/MyWrittenComm")}>작성한 댓글</div>
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
