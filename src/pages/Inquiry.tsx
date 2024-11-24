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
        <div className="Inquiry__phoneNum Num1">010-2440-6484</div>
        <div className="Inquiry__phoneNum Num2">010-8598-9305</div>
        <div className="Inquiry__phoneNum Num3">010-4793-5754</div>
        <div className="Inquiry__phoneNum Num4">010-7356-5675</div>
        <div className="Inquiry__phoneNum Num5">010-6412-2683</div>
        <div className="Inquiry__phoneNum Num6">010-3926-9025</div>
      </div>
      <Footer />
    </div>
  );
};

export default Inquiry;
