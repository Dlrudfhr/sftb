import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../assets/css/Main.css";
import "./card";
import React, { Children } from "react";



function Main() {
  return (
    <main>
      <h1 className="Main_title">main</h1>

      <article className="Main_article">
        <aside className="Main_aside1"></aside>
        <aside className="Main_aside2">
          <div className="Main_container">
            <div className="Main_rptlvks" onClick={() => window.location.href='/QnA'}>
              질문과 답
            </div>
            <div className="Main_rptlvks" onClick={() => window.location.href='/Certificate'}>
              자격증 정보
            </div>
            <div className="Main_rptlvks" onClick={() => window.location.href='/Share'}>
              과목별 정보공유
            </div>
            <div className="Main_rptlvks" onClick={() => window.location.href='/Mentor_mentee'}>
              멘토멘티
            </div>
          </div>

          <div className="Main_container2">
            <div className="Main_rptlvks2" onClick={() => window.location.href='/Project'}>
              프로젝트 개발
            </div>
            <div className="Main_rptlvks2" onClick={() => window.location.href='/Coding'}>
              코딩 문제
            </div>
            <div className="Main_rptlvks2" onClick={() => window.location.href='/Marketplace'}>
              전공책 장터
            </div>
            <div className="Main_rptlvks2" onClick={() => window.location.href='/Ledger'}>
              장부 기록 공개
            </div>
          </div>
        </aside>
        <aside className="Main_aside3"></aside>
      </article>
    </main>
  );
}
export default Main;
