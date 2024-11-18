import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from "axios";
import "../assets/css/StoreYellow.css";
import star from "../assets/images/기프티콘사진/star_americano.jpg";
import cafe9 from "../assets/images/상점사진/자산 9.png";
import cafe11 from "../assets/images/상점사진/자산 11.png";
import cafe13 from "../assets/images/상점사진/자산 13.png";
import cafe15 from "../assets/images/상점사진/자산 15.png";
import cafe16 from "../assets/images/상점사진/자산 16.png";
import left from "../assets/images/상점사진/left.png";
import right from "../assets/images/상점사진/right.png";

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
const StoreYellow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    // 상품 구매 처리
    const handlePurchase = async (price: number) => {
      const userId = localStorage.getItem("memberId");  // localStorage에서 userId 가져오기
      if (tokenCount !== null && tokenCount >= price) {
        try {
          const response = await axios.post("/api/store/purchase", {
            userId, // userId를 요청 본문에 포함
            price,
          });
           // 응답 데이터 콘솔에 출력
      console.log("응답 데이터:", response.data);
          if (response.data.success) {
            setTokenCount((prev) => (prev !== null ? prev - price : null)); // 토큰 차감
            alert("구매 성공!"); // 성공 메시지
          } else {
            alert("구매 실패: " + response.data.message); // 서버 실패 응답
          }
        } catch (error) {
          console.error("구매 요청 중 오류 발생:", error);
          alert("구매 중 오류가 발생했습니다.");
        }
      } else {
        alert("보유 토큰이 부족합니다."); // 잔액 부족
      }
    };
  const goToNextStore = () => {
    navigate("/StoreGreen"); // 처음으로 돌아가기
  };

  const goToPrevStore = () => {
    navigate("/StoreRed");
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
      <div className="StoreYellow__background">
        <button className="StoreYellow__PrevBtn" onClick={goToPrevStore}><img src={left}></img></button>
        <button className="StoreYellow__NextBtn" onClick={goToNextStore}><img src={right}></img></button>
        <div className="Store__left">
          <div className="Store__movebox">
              <img src={cafe9} className="Store__move"></img>
              <img src={cafe11} className="Store__move"></img>
              <img src={cafe13} className="Store__move"></img>
            </div>
        </div>
        <div className="StoreYellow__frame">
          <div className="StoreYellow__innerFrame">
            <div className="StoreYellow__productLine1">
              <div className="StoreGreen__productContainer">
                <img src={starAA} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">10000</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={starLatte} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">10001</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={megaAA} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">9999</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={megaAshot} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">10002</div>
              </div>
            </div>
            <div className="StoreYellow__selectBtnLine1">
              {[10000, 10001, 9999, 10002].map((value, index) => (
                <button
                  key={index}
                  className={`StoreYellow__selectBtn${index + 1}`}
                  type="button"
                  value={value}
                  onClick={() => handlePurchase(value)} // 구매 함수 연결
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
            <div className="StoreYellow__productLine2">
              <div className="StoreGreen__productContainer">
                <img src={megaChoco} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">10000</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={megaCookie} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">10001</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={twoChoco} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">9999</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={twoIcebox} className="StoreYellow__product" />
                <div className="StoreYellow_priceLabel">10002</div>
              </div>
            </div>
            <div className="StoreYellow__selectBtnLine2">
              {[10000, 10001, 9999, 10002].map((value, index) => (
                <button
                  key={index}
                  className={`StoreYellow__selectBtn${index + 5}`}
                  type="button"
                  value={value}
                  onClick={() => handlePurchase(value)} // 구매 함수 연결
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
            <div className="StoreYellow__coin">
              {tokenCount !== null && tokenCount !== undefined
                ? `${tokenCount.toLocaleString()}`
                : "로딩 중..."}
              <div className="StoreYellow__cointext">coin</div>
            </div>
          </div>
        </div>
        <div className="Store__right">
        <div className="Store__movebox">
              <img src={cafe15} className="Store__move"></img>
              <img src={cafe16} className="Store__move"></img>
              
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoreYellow;
