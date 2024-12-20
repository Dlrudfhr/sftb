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
import left from "../assets/images/상점사진/left.png";
import right from "../assets/images/상점사진/right.png";
import red1 from "../assets/images/상점사진/패스트푸드1.jpg";
import red2 from "../assets/images/상점사진/패스트푸드2.jpg";
import red3 from "../assets/images/상점사진/패스트푸드3.png";
import red4 from "../assets/images/상점사진/패스트푸드4.jpg";
import red5 from "../assets/images/상점사진/패스트푸드5.jpg";
import red6 from "../assets/images/상점사진/패스트푸드6.jpg";
import red7 from "../assets/images/상점사진/패스트푸드7.jpg";
import red8 from "../assets/images/상점사진/패스트푸드8.jpg";

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
                
              </div>
          </div>
        </div>
        <button className="StoreRed__PrevBtn" onClick={goToPrevStore}><img src={left} className="StoreGreen__leftBtn"></img></button>
        <button className="StoreRed__NextBtn" onClick={goToNextStore}><img src={right} className="StoreGreen__rightBtn"></img></button>
        <div className="StoreRed__middle">
          <div className="StoreRed__innerFrame">
            <div className="StoreRed__productLine1">
              <div className="StoreGreen__productContainer">
                <img src={red1} className="StoreRed__product" title="롯데리아 불고기버거"/>
                <div className="StoreRed_priceLabel">4,800</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={red2} className="StoreRed__product" title="맥도날드 상하이 치킨 스낵랩" />
                <div className="StoreRed_priceLabel">3,200</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={red3} className="StoreRed__product" title="롯데리아 토네이도 초코쿠키" />
                <div className="StoreRed_priceLabel">3,000</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={red4} className="StoreRed__product" title="롯데리아 양념감자" />
                <div className="StoreRed_priceLabel">2,500</div>
              </div>
            </div>
            <div className="StoreRed__selectBtnLine1">
              {[4800, 3200, 3000, 2500].map((value, index) => (
                <button
                  key={index}
                  className={`StoreRed__selectBtn${index + 1}`}
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
            <div className="StoreRed__productLine2">
              <div className="StoreGreen__productContainer">
                <img src={red5} className="StoreRed__product" title="롯데리아 치즈스틱"/>
                <div className="StoreRed_priceLabel">2,600</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={red6} className="StoreRed__product" title="맘스터치 싸이버거 단품"/>
                <div className="StoreRed_priceLabel">4,900</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={red7} className="StoreRed__product" title="이삭 토스트 5000원 상품권"/>
                <div className="StoreRed_priceLabel">5,000</div>
              </div>

              <div className="StoreGreen__productContainer">
                <img src={red8} className="StoreRed__product" title="맥도날드 에그 맥머핀 콤보"/>
                <div className="StoreRed_priceLabel">3,500</div>
              </div>
            </div>
            <div className="StoreRed__selectBtnLine2">
              {[2600, 4900, 5000, 3500].map((value, index) => (
                <button
                  key={index}
                  className={`StoreRed__selectBtn${index + 5}`}
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
              <img src={cafe8} className="Store__move"></img>
            </div>
        </div>
      </div>
    </div>
  );
};

export default StoreRed;
