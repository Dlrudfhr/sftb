import {useState} from "react";
import { Routes, Route, Link } from 'react-router-dom';
import './Main.css';
import './card';
import './PostPage';
import React, { Children } from "react";

// interface LoginPage {
//   children: any;
// }
function toLink() {
  alert("질문과 답 게시판으로 이동하시겠습니까?");
}

function Main() {
  
  return (
    <main>
<<<<<<< HEAD
      <h1>main</h1>
      
      <article>
        <aside className="aside1">
          
        </aside>
        <aside className="aside2">
          <div className="container">
             <div className='rptlvks' onClick={() => toLink()}> 
              <Link to= 'https://www.google.com/'> 질문과 답 </Link>
            </div>
            <div className='rptlvks' onClick={() => toLink()}>
              자격증 정보
            </div>
            <div className='rptlvks' onClick={() => toLink()}>
              과목별 정보공유
            </div>
            <div className='rptlvks' onClick={() => toLink()}>
              멘토멘티
            </div>
          </div>
          
          <div className="container2">
            <div className='rptlvks2' onClick={() => toLink()}>
              프로젝트 개발
            </div>
            <div className='rptlvks2' onClick={() => toLink()}>
              코딩 문제
            </div>
            <div className='rptlvks2' onClick={() => toLink()}>
              전공책 장터
            </div>
            <div className='rptlvks2' onClick={() => toLink()}>
              장부 기록 공개
            </div> 
          </div>
        </aside>
        <aside className="aside3">
          
        </aside>
        
      </article>
      
      
      
=======
      <div>
        <h1>Main 부분</h1>
      </div>
>>>>>>> cc86dbff898936c7ac5402f6f691445652ff3a0a
    </main>
  );
}
export default Main;
