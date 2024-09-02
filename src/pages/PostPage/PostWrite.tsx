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
        <div className="postwrite_input">
            <form>
                <input className="post_title" placeholder="제목을 작성해 주세요"></input>
                <textarea className="post_textarea" placeholder="게시글을 작성해주세요"></textarea>
                <Link to="/Certificate"><button className="post_button">제출하기</button></Link>
            </form>
            
            
                
            
        </div>
      
        <Footer />
      </>
  
  
    );
  };
  export default PostWrite;