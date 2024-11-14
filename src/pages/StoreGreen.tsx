import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import axios from "axios";
import "../assets/css/StoreGreen.css";
import greenBtn from "../assets/images/greenBtn.png"; // 빨간 버튼 이미지
import redBtn from "../assets/images/redBtn.png"; // 빨간 버튼 이미지
import rightBtn from "../assets/images/rightBtn.png";
import cafe1 from "../assets/images/상점사진/자산 1.png";
import cafe2 from "../assets/images/상점사진/자산 2.png";
import cafe3 from "../assets/images/상점사진/자산 3.png";
import cafe4 from "../assets/images/상점사진/자산 4.png";
import cafe5 from "../assets/images/상점사진/자산 5.png";
import left from "../assets/images/상점사진/left.png";
import right from "../assets/images/상점사진/right.png";




import megaAA from "../assets/images/giftImage/megaAA.png";
import megaAshot from "../assets/images/giftImage/megaAshot.png";
import megaChoco from "../assets/images/giftImage/megaChoco.png";
import megaCookie from "../assets/images/giftImage/megaCookie.png";
import starAA from "../assets/images/giftImage/starAA.png";
import starLatte from "../assets/images/giftImage/starLatte.png";
import twoChoco from "../assets/images/giftImage/twoChoco.png";
import twoIcebox from "../assets/images/giftImage/twoIcebox.png";

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
        <div className="Store__area">
              <button className="StoreGreen__PrevBtn" onClick={goToPrevStore}>
                <img src={left}></img>
              </button>
              <button className="StoreGreen__NextBtn" onClick={goToNextStore}>
                <img src={right}></img>
              </button>
          <div className="Store__left">

            <div className="Store__movebox">
              <img src={cafe1} className="Store__move"></img>
              <img src={cafe2} className="Store__move"></img>
              <img src={cafe3} className="Store__move"></img>
            </div>
          </div>
          <div className="StoreGreen__middle">
            <div className="StoreGreen__innerFrame">
              <div className="StoreGreen__productLine1">
                <div className="StoreGreen__productContainer">
                  <img src={starAA} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">10000</div>
                </div>

                <div className="StoreGreen__productContainer">
                  <img src={starLatte} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">10001</div>
                </div>

                <div className="StoreGreen__productContainer">
                  <img src={megaAA} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">9999</div>
                </div>

                <div className="StoreGreen__productContainer">
                  <img src={megaAshot} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">10002</div>
                </div>
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
                <div className="StoreGreen__productContainer">
                  <img src={megaChoco} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">10000</div>
                </div>

                <div className="StoreGreen__productContainer">
                  <img src={megaCookie} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">10001</div>
                </div>

                <div className="StoreGreen__productContainer">
                  <img src={twoChoco} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">9999</div>
                </div>

                <div className="StoreGreen__productContainer">
                  <img src={twoIcebox} className="StoreGreen__product" />
                  <div className="StoreGreen_priceLabel">10002</div>
                </div>
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
          <div className="Store__right">
            <div className="Store__movebox">
              <img src={cafe5} className="Store__move"></img>
              <img src={cafe4} className="Store__move"></img>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreGreen;
