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
          <div className="Certificate_search_box">
            <div className="Certificate_form_group">
              
              {/*검색 필터 */}
              <select className="Certificate_search_key">
                <option>--검색선택--</option>
                <option>제목</option>
                <option>내용</option>
                <option>등록자명</option>
              </select>
            </div>
            
            <div className="Certificate_form_group">
              {/*검색창 */}
              <input className="Certificate_search_txt" type="text" placeholder="검색어를 입력하세요."></input>
            </div>
            <div className="Certificate_button_list">
              <button className="Certificate_search_button"  type="submit">검색</button>
              <button className="Certificate_search_button"  type="button">초기화</button>
            </div>

            
          </div>
          {/*게시글 */}
          <table className="Certificate_list">
            <thead>
              <tr>
                <th>순번</th>
                <th>제목</th>
                <th>등록자명</th>
                <th>등록일</th>
                <th>조회수</th>

              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td></td>
                <td>김**</td>
                <td>2024-08-15</td>
                <td>12</td>
              </tr>
              <tr>
                <td>2</td>
                <td></td>
                <td>이**</td>
                <td>2024-08-14</td>
                <td>100</td>
              </tr>
              <tr>
                <td>3</td>
                <td></td>
                <td>강**</td>
                <td>2024-08-12</td>
                <td>58</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
      
      <div></div>
      <Footer />
    </>


  );
};
export default Certificate;