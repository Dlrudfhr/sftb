import React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/PostWrite.css";

const PostWrite = () => {
  

    return(
      <>
        <Header />
        {/*게시판 타이틀 */}
        <div className="postpage_title" onClick={() => (window.location.href = "/Certificate")}>자격증게시판</div>
        
        <div className="PostWrite_layout">
        

          
          
          {/*게시글 작성자 */}
          <div className="PostDetail_profile">
              <div className="PostDetail_proImage">{/*<img src={catImage}/>*/}</div>
              <div className="">
                  <div className="PostDetail_writer">작성자</div>
              </div>
          </div>

          {/*게시글 작성 폼 */}
          <input className="post_title" placeholder="제목을 작성해 주세요"></input>
          <div><textarea className="post_textarea" placeholder="게시글을 작성해주세요"></textarea></div>
          <div><Link to="/Certificate"><button className="post_button">제출하기</button></Link></div>
          <div><button className="PostWrite_golist" onClick={() => (window.location.href = "/Certificate")}>목록</button></div>
        </div>

      
        <Footer />
      </>
  
  
    );
  };
  export default PostWrite;