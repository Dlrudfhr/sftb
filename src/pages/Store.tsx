import React from "react";
import Header from "./Header"; // 상단 배너 컴포넌트
import Footer from "./Footer"; // 하단 배너 컴포넌트
import "../assets/css/Store.css";

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
                1,000 coin
              </div>
              <div className=""></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;
