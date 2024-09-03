import React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/Certificate.css";
import "./PostWrite";

const Certificate = () => {
  

  return(
    <>
    <Header />
      
    <h3 className="postpage_title">자격증 게시판</h3>
    {/* 검색창 폼*/}
    {/* <div className="search_box_Certificate"> */}
    <div className="fixed_layout">
      <div className="form">       
        
        {/*검색 필터  - 등록자명, 제목, 내용 */}
        <div className="form_group_Certificate">
          <select className="search_key_Certificate">
            <option>--검색선택--</option>
            <option>제목</option>
            <option>내용</option>
            <option>등록자명</option>
          </select>
        </div>
        
        {/*검색창 */}
        <div className="form_group_Certificate">
          <input className="search_txt_Certificate" type="text" placeholder="검색어를 입력하세요."></input>
        </div>
        
        {/*검색폼 버튼-검색, 초기화 */}
        <div className="button_list_Certificate">
          <button className="search_button_Certificate"  type="submit">검색</button>
          <button className="search_button_Certificate"  type="button">초기화</button>
        </div>

      </div> 

      <Link to="/PostWrite">
        <button type="submit">작성하기</button>
      </Link>

      <ul>
        <li>
          <div className="card_Certificate"
              onClick={() => (window.location.href = "/Share")}>
              <div className="Main_card_content">
              <div className="Main_card_title">과목별 정보공유</div>
              <div className="Main_card_info">과목별 정보공유</div>
              <div className="Main_card_icons">icons</div>
            </div>
          </div>
        </li>
        <li>
          <div className="card_Certificate"
              onClick={() => (window.location.href = "/Share")}>
              <div className="Main_card_content">
              <div className="Main_card_title">과목별 정보공유</div>
              <div className="Main_card_info">과목별 정보공유</div>
              <div className="Main_card_icons">icons</div>
            </div>
          </div>
        </li>
        <li>
          <div className="card_Certificate"
              onClick={() => (window.location.href = "/Share")}>
              <div className="Main_card_content">
              <div className="Main_card_title">과목별 정보공유</div>
              <div className="Main_card_info">과목별 정보공유</div>
              <div className="Main_card_icons">icons</div>
            </div>
          </div>
        </li>
        <li>
          <div className="card_Certificate"
              onClick={() => (window.location.href = "/Share")}>
              <div className="Main_card_content">
              <div className="Main_card_title">과목별 정보공유</div>
              <div className="Main_card_info">과목별 정보공유</div>
              <div className="Main_card_icons">icons</div>
            </div>
          </div>
        </li>
      </ul>
      
      <ul>
        <li>
          <div className="card_Certificate"
              onClick={() => (window.location.href = "/Share")}>
              <div className="Main_card_content">
              <div className="Main_card_title">과목별 정보공유</div>
              <div className="Main_card_info">과목별 정보공유</div>
              <div className="Main_card_icons">icons</div>
            </div>
          </div>
        </li>
        <li>
          <div className="card_Certificate"
              onClick={() => (window.location.href = "/Share")}>
              <div className="Main_card_content">
              <div className="Main_card_title">과목별 정보공유</div>
              <div className="Main_card_info">과목별 정보공유</div>
              <div className="Main_card_icons">icons</div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    


      
      
      <Footer />
    </>


  );
};
export default Certificate;