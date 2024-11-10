import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from "axios";
import "../assets/css/StoreGreen.css";
import star from "../assets/images/기프티콘사진/star_americano.jpg";
import greenBtn from "../assets/images/greenBtn.png"; // 빨간 버튼 이미지
import redBtn from "../assets/images/redBtn.png"; // 빨간 버튼 이미지
import rightBtn from "../assets/images/rightBtn.png";

const StoreGreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    navigate("/StoreRed");
  };

  const goToPrevStore = () => {
    navigate("/StoreYellow");
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
      <div className="StoreGreen__background">
        <button className="StoreGreen__PrevBtn" onClick={goToPrevStore}>
          ◀
        </button>

        <div className="StoreGreen__frame">
          <div className="StoreGreen__innerFrame">
            <div className="StoreGreen__productLine1">
              <img src={star} className="StoreGreen__product" alt="스타 상품" />
              <div className="StoreGreen__product"></div>
              <div className="StoreGreen__product"></div>
              <div className="StoreGreen__product"></div>
            </div>
            <div className="StoreGreen__selectBtnLine1">
              {/* 
              1 2 3 4
              5 6 7 8 상품순
              */}
              {/*첫번째 상품 가격, 두번째 상품 가격, 세번째 상품가격, 네번째 상품가격 */}
              {[10000, 10001, 9999, 10002].map((value, index) => (
                <button
                  key={index}
                  className={`StoreGreen__selectBtn${index + 1}`}
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
            <div className="StoreGreen__productLine2">
              <div className="StoreGreen__product"></div>
              <div className="StoreGreen__product"></div>
              <div className="StoreGreen__product"></div>
              <div className="StoreGreen__product"></div>
            </div>
            <div className="StoreGreen__selectBtnLine2">
              {[10000, 10001, 9999, 10002].map((value, index) => (
                <button
                  key={index}
                  className={`StoreGreen__selectBtn${index + 5}`}
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
            <div className="StoreGreen__coin">
              {tokenCount !== null && tokenCount !== undefined
                ? `${tokenCount.toLocaleString()}`
                : "로딩 중..."}
              <div className="StoreGreen__cointext">coin</div>
            </div>
          </div>
        </div>
        <button className="StoreGreen__NextBtn" onClick={goToNextStore}>
          <img src={rightBtn}></img>
        </button>
      </div>
    </div>
  );
};

export default StoreGreen;
