import React from "react";
import { useState, useRef } from "react"; /* 바로가기 참조 */
import { Routes, Route, Link } from "react-router-dom";
import Header from "../Header"; /* Header 참조 */
import Footer from "../Footer"; /* footer 참조 */
import "../../assets/css/Certificate.css"; /* 스타일 참조 */

const Certificate = () => {
  const highElement = useRef<null | HTMLDivElement>(null); //상단으로 돌아가기 버튼

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return(
    <>
    <Header />
      
    

    {/* 검색창 폼*/}
    {/* <div className="search_box_Certificate"> */}
    <div className="Certificate_layout">

      <h4 className="postpage_title">자격증 게시판</h4>

      {/*위로가기 버튼 */}
      <div className="Certificate_high">
        <button type="button" onClick={() => onMoveBox(highElement)}>
          top
        </button>
      </div>

      {/* */}
      <div className="Certificate_Search">
        <div className="Certificate_Search_form">       
        
          {/*검색 필터  - 등록자명, 제목, 내용 */}
          <div className="Certificate_filter">
            <select className="Certificate_search_key">
              <option>--검색선택--</option>
              <option>제목</option>
              <option>내용</option>
              <option>등록자명</option>
            </select>
          </div>
          
          {/*검색창 */}
          <div className="Certificate_input">
            <input className="Certificate_search_txt" type="text" placeholder="검색어를 입력하세요."></input>
          </div>
          
          {/*검색폼 버튼-검색, 초기화 */}
          <div className="Certificate_button_list">
            <button className="Certificate_search_button"  type="submit">검색</button>
            <button className="Certificate_search_button"  type="button">초기화</button>
          </div>
          
        </div>
      </div>

      {/*  */}
      <div className="Certificate_Number">
        <div className="Certificate_postNumber">
          <span>총 게시물 <strong>16262</strong></span>
          <span>현재 페이지 <strong>1/1627</strong></span>
        </div>

        {/*게시글 작성 페이지로 이동 */}
        <div className="Certificate_write">
          <Link to="/PostWrite" >
            <button type="submit" className="Certificate_toWrite">작성하기</button>
          </Link>
        </div>
      </div>

      <div className="Certificate_postline">

        {/*첫번째 줄 게시글 */}
        <ul className="Certificate_postline1">
          <li>
            <div className="Certificate_card"
                onClick={() => (window.location.href = "/PostDetail")}>
                <div className="Certificate_card_innerbox">
                <div className="Certificate_card_title">정보처리기사 언제부터</div>
                <div className="Certificate_card_info">정보처리기사는 보통 언제부터 준비하나요?</div>
                <div className="Certificate_card_icons">icons</div>
              </div>
            </div>
          </li>
          <li>
            <div className="Certificate_card"
                onClick={() => (window.location.href = "/PostDetail")}>
                <div className="Certificate_card_innerbox">
                <div className="Certificate_card_title">정보처리기사 언제부터</div>
                <div className="Certificate_card_info">정보처리기사는 보통 언제부터 준비하나요?</div>
                <div className="Certificate_card_icons">icons</div>
              </div>
            </div>
          </li>
          <li>
            <div className="Certificate_card"
                onClick={() => (window.location.href = "/PostDetail")}>
                <div className="Certificate_card_innerbox">
                <div className="Certificate_card_title">정보처리기사 언제부터</div>
                <div className="Certificate_card_info">정보처리기사는 보통 언제부터 준비하나요?</div>
                <div className="Certificate_card_icons">icons</div>
              </div>
            </div>
          </li>
          <li>
            <div className="Certificate_card"
                onClick={() => (window.location.href = "/PostDetail")}>
                <div className="Certificate_card_innerbox">
                <div className="Certificate_card_title">정보처리기사 언제부터</div>
                <div className="Certificate_card_info">정보처리기사는 보통 언제부터 준비하나요?</div>
                <div className="Certificate_card_icons">icons</div>
              </div>
            </div>
          </li>
        </ul>
        
        {/*두번째 줄 게시글 */}
        <ul>
          <li>
            <div className="Certificate_card"
                onClick={() => (window.location.href = "/PostDetail")}>
                <div className="Certificate_card_innerbox">
                <div className="Certificate_card_title">정보처리기사 언제부터</div>
                <div className="Certificate_card_info">정보처리기사는 보통 언제부터 준비하나요?</div>
                <div className="Certificate_card_icons">icons</div>
              </div>
            </div>
          </li>
          <li>
            <div className="Certificate_card"
                onClick={() => (window.location.href = "/PostDetail")}>
                <div className="Certificate_card_innerbox">
                <div className="Certificate_card_title">정보처리기사 언제부터</div>
                <div className="Certificate_card_info">정보처리기사는 보통 언제부터 준비하나요?</div>
                <div className="Certificate_card_icons">icons</div>
              </div>
            </div>
          </li>
        </ul>

      </div>
    </div>
    
    {/*게시판 페이지네이션 */}
    <div className="Certificate_pages">
      <ul className="Certificate_pageNumber">
        
        <li><div className="Certificate_pagebtn"><Link to="#"  style={{ textDecoration: "none"}} onClick={() => (window.location.href = "/Certificate")}>1</Link></div></li>
        <li><div className="Certificate_pagebtn"><Link to="#"  style={{ textDecoration: "none"}} onClick={() => (window.location.href = "/Certificate")}>2</Link></div></li>
        <li><div className="Certificate_pagebtn"><Link to="#"  style={{ textDecoration: "none"}} onClick={() => (window.location.href = "/Certificate")}>3</Link></div></li>
        <li><div className="Certificate_pagebtn"><Link to="#"  style={{ textDecoration: "none"}} onClick={() => (window.location.href = "/Certificate")}>4</Link></div></li>
        <li><div className="Certificate_pagebtn"><Link to="#"  style={{ textDecoration: "none"}} onClick={() => (window.location.href = "/Certificate")}>5</Link></div></li>
        <li><div className="Certificate_pagebtn"><Link to="#"  style={{ textDecoration: "none"}} onClick={() => (window.location.href = "/Certificate")}>6</Link></div></li>
        
      </ul>
    </div>
      
      
      <Footer />
    </>


  );
};
export default Certificate;