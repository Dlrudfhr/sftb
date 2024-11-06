import React, { useEffect, useState } from "react";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from "axios";
import "../assets/css/Store.css";

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tokenCount, setTokenCount] = useState<number | null>(null);

  // 사용자 토큰을 가져오는 함수
  const fetchUserToken = async (userId: string) => {
    try {
      const response = await axios.get("/api/auth/token", {
        params: { userId }, // userId를 쿼리 파라미터로 전달
      });
      console.log("API 응답:", response.data); // 응답 데이터 확인
      setTokenCount(response.data); // 데이터 구조에 맞게 수정
    } catch (error) {
      console.error("토큰을 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const userId = localStorage.getItem("memberId");
    if (userId) {
      fetchUserToken(userId); // 사용자 ID가 있을 때 API 호출
    }
  }, []);
  return (
    <div>
      <Header /> {/* 상단 배너 */}
      <Footer /> {/* 하단 배너 */}
      <div className="Store__background">
        <div className="Store__section">
          <div className="Store__h1">_</div>
          <div className="Store__frame">
            <div className="Store__innerFrame">
              <div className="Store__productLine1">
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
              </div>

              <div className="Store__productLine2">
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
                <div className="Store__prodBlock">
                  <div className="Store__product"></div>
                  <div className="Store__selectBtn">SELECT</div>
                </div>
              </div>
              <div className="Store__coin">
                {tokenCount !== null && tokenCount !== undefined
                  ? `${tokenCount.toLocaleString()}`
                  : "로딩 중..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
