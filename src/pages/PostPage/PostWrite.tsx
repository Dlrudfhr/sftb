import React from "react";
import { useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/PostWrite.css";
import axios from "axios";

function PostWrite() {
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지
  const navigate = useNavigate();

  // 로그인된 사용자 UserName을 localStorage에서 가져옴
  const userName = localStorage.getItem("userName");
  console.log("userName from localStorage:", userName); // userName 로그 출력

  // 게시물 제출 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    try {
      // userName이 없는 경우 에러 메시지 설정
      if (!userName) {
        setErrorMessage("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      console.log("Submitting post with userName:", userName); // userName 로그 출력

      const response = await axios.post(
        "http://localhost:8080/api/posts", // 백엔드 URL
        {
          title: title,
          content: content,
          userName: userName, // userName을 memberId로 사용
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 서버에서 성공 응답을 받으면 메인 페이지로 이동
      if (response.status === 200) {
        navigate("/Main");
      } else {
        setErrorMessage("게시물 작성에 실패했습니다.");
      }
    } catch (error) {
      setErrorMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <Header />
      <div className="PostWrite_layout">
        <form className="postWrite__form" onSubmit={handleSubmit}>
          <h3 className="postpage_title" onClick={() => (window.location.href = "/Certificate")}>게시물 작성</h3>

          <label className="postWrite__label" htmlFor="post_title">
          </label>
          <input
            className="post_title"
            type="text"
            id="post_title"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <br />

          <label className="postWrite__label" htmlFor="post_content">
          </label>
          <textarea
            className="post_textarea"
            id="post_content"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <br />

          {/* 에러 메시지 출력 */}
          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <div className="PostWrite_btns">
            <button className="PostWrite_golist" onClick={() => (window.location.href = "/Certificate")}>목록</button>
            <button className="post_button" type="submit">
              작성하기
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default PostWrite;
