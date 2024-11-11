import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from "axios";
import "../assets/css/StoreRed.css";
import star from "../assets/images/기프티콘사진/star_americano.jpg";

import greenBtn from "../assets/images/greenBtn.png"; // 빨간 버튼 이미지
import redBtn from "../assets/images/redBtn.png"; // 빨간 버튼 이미지
const StoreRed: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenCount, setTokenCount] = useState<number | null>(null);
  const navigate = useNavigate();
  // 사용자 토큰을 가져오는 함수
  const fetchUserToken = async (userId: string) => {
    try {
      const response = await axios.get("/api/auth/token", {
        params: { userId },
      });
      setTokenCount(response.data);
    } catch (error) {
      console.error("토큰을 가져오는 중 오류 발생:", error);
    }
  };
  const goToNextStore = () => {
    navigate("/StoreYellow");
  };

  const goToPrevStore = () => {
    navigate("/StoreGreen");
  };
  useEffect(() => {
    const userId = localStorage.getItem("memberId");
    if (userId) {
      fetchUserToken(userId); // 사용자 ID가 있을 때 API 호출
    }
  }, []);

  return (
    <div>
      <Header />
      <Footer />
      <div className="StoreRed__background">
        <button onClick={goToPrevStore}>◀️</button>
        <button onClick={goToNextStore}>▶️</button>
        <div className="StoreRed__frame">
          <div className="StoreRed__innerFrame">
            <div className="StoreRed__productLine1">
              <img src={star} className="StoreRed__product" alt="스타 상품" />
              <div className="StoreRed__product"></div>
              <div className="StoreRed__product"></div>
              <div className="StoreRed__product"></div>
            </div>
            <div className="StoreRed__selectBtnLine1">
              {[10000, 10001, 9999, 10002].map((value, index) => (
                <button
                  key={index}
                  className={`StoreRed__selectBtn${index + 1}`}
                  type="button"
                  value={value}
                  style={{
                    backgroundImage: `url(${
                      tokenCount !== null && tokenCount >= value
                        ? greenBtn
                        : redBtn
                    })`,
                    backgroundSize: "cover",
                    backgroundColor: "transparent",
                  }}
                />
              ))}
            </div>
            <div className="StoreRed__productLine2">
              <div className="StoreRed__product"></div>
              <div className="StoreRed__product"></div>
              <div className="StoreRed__product"></div>
              <div className="StoreRed__product"></div>
            </div>
            <div className="StoreRed__selectBtnLine2">
              {[10000, 10001, 9999, 10002].map((value, index) => (
                <button
                  key={index}
                  className={`StoreRed__selectBtn${index + 5}`}
                  type="button"
                  value={value}
                  style={{
                    backgroundImage: `url(${
                      tokenCount !== null && tokenCount >= value
                        ? greenBtn
                        : redBtn
                    })`,
                    backgroundSize: "cover",
                    backgroundColor: "transparent",
                  }}
                />
              ))}
            </div>
            <div className="StoreRed__coin">
              {tokenCount !== null && tokenCount !== undefined
                ? `${tokenCount.toLocaleString()}`
                : "로딩 중..."}
              <div className="StoreRed__cointext">coin</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRed;
