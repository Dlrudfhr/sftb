import { useState, useRef, useEffect } from "react"; //useRef 버튼 클릭 시 스크롤 이벤트
import { Routes, Route, Link } from "react-router-dom";
import "../assets/css/Main.css";
import React, { Children } from "react";
import "../assets/css/Font.css";
import question from "../assets/images/question.png";
import slide01 from "../assets/images/slide01.jpg";
import slide02 from "../assets/images/slide02.png";
import slide03 from "../assets/images/slide03.png";
import { FaRegComment, FaComments } from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import { FcConferenceCall, FcShop, FcCommandLine, FcWorkflow, FcCollaboration, FcDiploma1, FcDocument } from "react-icons/fc";

function Main() {
  const firstElement = useRef<null | HTMLDivElement>(null); //스크롤 될 첫번째 위치요소
  const secondElement = useRef<null | HTMLDivElement>(null); //스크롤 될 두번째 위치요소
  const thirdElement = useRef<null | HTMLDivElement>(null); //스크롤 될 세번째 위치요소
  const fourthElement = useRef<null | HTMLDivElement>(null); //스크롤 될 네번째 위치요소

  const [showIntro, setShowIntro] = useState(true);
  const handleCloseIntro = () => {
    setShowIntro(false);
  };

  //버튼 클릭시 ref를 받아와 요소로 이동하는 스크롤 이벤트
  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) { const elementTop = ref.current.getBoundingClientRect().top + window.scrollY; window.scrollTo({ top: elementTop - 120, behavior: "smooth" }); }
  };

  return (
    <article className="Main_layout">
      {/*배너 전체 박스*/}
      <div className="Main_banner">
        <div className="Main_box_visual">
          Hello, World!<br></br>
          We're in the Department of Information & Communication
        </div>
        {/*카테고리 이동 버튼 */}
        <div className="Main_box_tab">
          <ul>
            <li className="on">
              <button
                className="Main_button"
                title="소통 카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(firstElement)}
              >
                💬 소통해요!
              </button>
            </li>
            <li className="">
              <button
                className="Main_button"
                title="공부 카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(secondElement)}
              >
                같이 공부해요!
              </button>
            </li>
            <li className="">
              <button
                className="Main_button"
                title="else카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(thirdElement)}
              >
                장터
              </button>
            </li>
            <li className="">
              <button
                className="Main_button"
                title="else카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(fourthElement)}
              >
                기록열람
              </button>
            </li>
          </ul>
        </div>
      </div>

      

      <div className="Main_categoryLayout">
        {/*소통 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_communication_card">
          <div className="Main_category_title" ref={firstElement}>
            💬 소통해요!
          </div>
          <ul className="Main__line">
            {/*질문과 답 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/QnA")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">질문과 답</div>
                  <div className="Main_card_info">자유롭게 질문하고 답하기</div>
                  <div className="Main_card_icons">
                    <FaRegComment />
                  </div>
                </div>
              </div>
            </li>
            {/*자격증 정보 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Certificate")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">자격증 정보</div>
                  <div className="Main_card_info">자격증 정보</div>
                  <div className="Main_card_icons"><FcDiploma1 /></div>
                </div>
              </div>
            </li>
            {/*과목별 정보공유 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Share")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">과목별 정보공유</div>
                  <div className="Main_card_info">과목별 정보공유</div>
                  <div className="Main_card_icons"><FcWorkflow /></div>
                </div>
              </div>
            </li>
            {/*자유게시판 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/FreePost")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">자유게시판</div>
                  <div className="Main_card_info">자유게시판</div>
                  <div className="Main_card_icons"><FaComments /></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/*공부 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_study_card">
          <div className="Main_category_title" ref={secondElement}>
            공부해요!
          </div>
          <ul className="Main__line">
            {/*멘토멘티 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Mentor_mentee")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">멘토멘티</div>
                  <div className="Main_card_info">멘토멘티</div>
                  <div className="Main_card_icons"><FcCollaboration /></div>
                </div>
              </div>
            </li>
            {/*프로젝트 개발 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Project")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">프로젝트 개발</div>
                  <div className="Main_card_info">프로젝트 개발</div>
                  <div className="Main_card_icons"><FcConferenceCall /></div>
                </div>
              </div>
            </li>
            {/*코딩문제 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">코딩 문제</div>
                  <div className="Main_card_info">코딩 문제</div>
                  <div className="Main_card_icons"><FcCommandLine /></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/*나머지 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_else_card">
          <div className="Main_category_title" ref={thirdElement}>
            장터
          </div>
          <ul className="Main__line">
            {/*전공책 장터 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Marketplace")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">전공책 장터</div>
                  <div className="Main_card_info">전공책 장터</div>
                  <div className="Main_card_icons"><FcShop /></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/*나머지 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_else_card">
          <div className="Main_category_title" ref={fourthElement}>
            기록열람
          </div>
          <ul className="Main__line">
            {/*장부기록 공개 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Ledger")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">장부 기록 공개</div>
                  <div className="Main_card_info">장부 기록 공개</div>
                  <div className="Main_card_icons"><FcDocument /></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/*스크롤 시 필요한 footer공간 */}
      <div className="Main_last_div"></div>
    </article>
  );
}
export default Main;
