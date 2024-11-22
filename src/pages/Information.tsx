import React, { useEffect, useState } from "react";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from "axios";
import "../assets/css/Information.css";
import { getTierImage } from "./TierImageUtils";

const Information: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const userId = localStorage.getItem("memberId");
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/auth/users/info`,
          {
            params: { userId: userId },
          }
        );
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
                <div className="Information__userImage">
                  <img
                    className="Information__tierImage"
                    src={getTierImage(user?.tier)}
                  ></img>
                </div>
                <div className="Information__user">
                  <div className="Information__userTL">
                    <div>
                      {user?.tier} LEVEL.{user?.userLevel}
                    </div>
                  </div>
                  <div className="Information__userName">{user?.userName}</div>
                  <div className="Information__userInfo">
                    <b>학번</b> : {user?.studentID}
                  </div>
                  <div className="Information__userInfo">
                    <b>성과금</b> :{user?.token} COIN
                  </div>
                  <div className="Information__userInfo">
                    <b>EMAIL</b> : {user?.email}
                  </div>
                  <div className="Information__logo">SFTB</div>
                </div>
              </div>

              <div className="Information__postbox">
                <div
                  className="Information__mypost"
                  onClick={() => (window.location.href = "/MyWrittenPost")}
                >
                  <div className="Information_mypostBtn">작성한 글</div>{" "}
                </div>
                <div
                  className="Information__mypost"
                  onClick={() => (window.location.href = "/MyBookmark")}
                >
                  <div className="Information_mypostBtn">북마크 한 글</div>
                </div>
                <div
                  className="Information__mypost"
                  onClick={() => (window.location.href = "/MyWrittenComm")}
                >
                  <div className="Information_mypostBtn">작성한 댓글</div>
                </div>
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
