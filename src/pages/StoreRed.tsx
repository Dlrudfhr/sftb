import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from "axios";
import "../assets/css/StoreRed.css";
import star from "../assets/images/기프티콘사진/star_americano.jpg";
import cafe6 from "../assets/images/상점사진/자산 6.png";
import cafe7 from "../assets/images/상점사진/자산 7.png";
import cafe8 from "../assets/images/상점사진/자산 8.png";
import cafe12 from "../assets/images/상점사진/자산 12.png";
import cafe14 from "../assets/images/상점사진/자산 14.png";

import greenBtn from "../assets/images/greenBtn.png"; // 빨간 버튼 이미지
import redBtn from "../assets/images/redBtn.png"; // 빨간 버튼 이미지

import megaAA from "../assets/images/giftImage/megaAA.png";
import megaAshot from "../assets/images/giftImage/megaAshot.png";
import megaChoco from "../assets/images/giftImage/megaChoco.png";
import megaCookie from "../assets/images/giftImage/megaCookie.png";
import starAA from "../assets/images/giftImage/starAA.png";
import starLatte from "../assets/images/giftImage/starLatte.png";
import twoChoco from "../assets/images/giftImage/twoChoco.png";
import twoIcebox from "../assets/images/giftImage/twoIcebox.png";
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
        <div className="Store__area">
          <div className="Store__left">
            <div className="Store__movebox">
                <img src={cafe6} className="Store__move"></img>
                <img src={cafe7} className="Store__move"></img>
                <img src={cafe8} className="Store__move"></img>
              </div>
          </div>
        </div>
        <button className="StoreRed__PrevBtn" onClick={goToPrevStore}>◀️</button>
        <button className="StoreRed__NextBtn" onClick={goToNextStore}>▶️</button>
        <div className="StoreRed__middle">
          <div className="StoreRed__innerFrame">
            <div className="StoreRed__productLine1">
              <div className="StoreGreen__productContainer">
                <img src={starAA} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">10000</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={starLatte} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">10001</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={megaAA} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">9999</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={megaAshot} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">10002</div>
              </div>
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
              <div className="StoreGreen__productContainer">
                <img src={megaChoco} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">10000</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={megaCookie} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">10001</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={twoChoco} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">9999</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={twoIcebox} className="StoreRed__product" />
                <div className="StoreRed_priceLabel">10002</div>
              </div>
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
        <div className="Store__right">
          <div className="Store__movebox">
              <img src={cafe12} className="Store__move"></img>
              <img src={cafe14} className="Store__move"></img>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRed;
