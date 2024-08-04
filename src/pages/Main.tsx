import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../assets/css/Main.css";
import React, { Children } from "react";
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.scss';



function Main() {
  // const element = useRef();
  // const onMoveBox = () => {
  //   element.current.scrollIntoView({ behavior: "smooth", block: "start" });
  // };
  return (
    <article className="Main_content_about">
      <div className="Main_banner"> {/*배너 전체 박스 */}
        <div className="Main_box_visual">
          <strong className="Main_title_visual">
            하이브리드 워킹 시대에<br></br>
            최적화된 업무 플랫폼
          </strong>
        </div>
        <div className="box_tab">{/*카테고리 이동 버튼 */}
          <ul>
            <li className="on"><button type="button" /*onClick={onMoveBox}*/>소통해요!</button></li>
            <li className=""><button type="button">같이 공부해요!</button></li>
            <li className=""><button type="button">else</button></li>
          </ul>
        </div>
      </div>
      
      <div className="Main_info_cate" id="Main_communication_card" >
        <strong className="Main_title_cate" /*ref={element}*/>소통해요!</strong>
        <ul>
          <li><div className="Main_card" onClick={() => window.location.href='/QnA'}><div><em className="Main_card_title">질문과 답</em></div><span className="Main_card_info">자유롭게 질문하고 답하기</span></div></li>
          <li><div className="Main_card" onClick={() => window.location.href='/Certificate'}><em className="Main_card_title">자격증 정보</em></div></li>
          <li><div className="Main_card" onClick={() => window.location.href='/Share'}><em className="Main_card_title">과목별 정보공유</em></div></li>
        </ul>
        
      </div>      

      <div className="Main_info_cate" id="Main_study_card" >
        <strong className="Main_title_cate">공부해요!</strong>
        <ul>
          <li><div className="Main_card" onClick={() => window.location.href='/Mentor_mentee'}><em className="Main_card_title">멘토멘티</em></div></li>
          <li><div className="Main_card" onClick={() => window.location.href='/Project'}><em className="Main_card_title">프로젝트 개발</em></div></li>
          <li><div className="Main_card" onClick={() => window.location.href='/Coding'}><em className="Main_card_title">코딩 문제</em></div></li>
        </ul>
      </div>

      <div className="Main_info_cate" id="Main_else_card" >
        <strong className="Main_title_cate">else</strong>
        <ul>
          <li><div className="Main_card" onClick={() => window.location.href='/FreePost'}><em className="Main_card_title">자유게시판</em></div></li>
          <li><div className="Main_card" onClick={() => window.location.href='/Marketplace'}><em className="Main_card_title">전공책 장터</em></div></li>
          <li><div className="Main_card" onClick={() => window.location.href='/Ledger'}><em className="Main_card_title">장부 기록 공개</em></div></li>
        </ul>
      </div>
        
        
      
    </article>
  );
}
export default Main;
