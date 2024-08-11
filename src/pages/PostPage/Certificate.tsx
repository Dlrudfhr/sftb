import React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/Certificate.css";

const Certificate = () => {
  

  return(
    <>
    <Header />
      
      <div className="Certificate_outline">
        
        <div className="Certificate_main">
          <h3 className="postpage_title">자격증 게시판</h3>
          <div className="Certificate_list">
            <div className="Certificate_post">정보처리기사 필기 많이 어렵나요?</div>
            <div className="Certificate_post">정보보안기사 준비하시는 분?</div>
            <div className="Certificate_post">cc</div>
            <div className="Certificate_post">cc</div>
            <div className="Certificate_post">cc</div>
            <div className="Certificate_post">cc</div>
            <div className="Certificate_post">cc</div>
            <div className="Certificate_post">cc</div>
            <div className="Certificate_post">cc</div>
            <div className="Certificate_post">cc</div>
          </div>
        </div>

      </div>
      
      <div></div>
      <Footer />
    </>


  );
};
export default Certificate;