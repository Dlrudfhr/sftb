import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import "../assets/css/Inquiry.css";
const Inquiry = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };

  return (
    <div>
      <Header />
      <div className="Inquiry__container">
        <div className="Inquiry__innerbox">
          <div className="Inquiry__phoneNum Num1">이경록: 010-2440-6484</div>
          <div className="Inquiry__phoneNum Num2">이정이: 010-8598-9305</div>
          <div className="Inquiry__phoneNum Num3">이찬회: 010-4793-5754</div>
          <div className="Inquiry__phoneNum Num4">김태영: 010-7356-5675</div>
          <div className="Inquiry__phoneNum Num5">서수진: 010-6412-2683</div>
          <div className="Inquiry__phoneNum Num6">신성원: 010-3926-9025</div>
        </div>


      </div>
      <Footer />
    </div>
  );
};

export default Inquiry;
