import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/PostPage/PostWrite.css";
import axios from "axios";

function PostWrite() {
  const [title, setTitle] = useState(""); // 제목
  const [content, setContent] = useState(""); // 내용
  const [postId, setPostID] = useState(""); // 게시물 고유 번호
  const [errorMessage, setErrorMessage] = useState(""); // 에러 메시지
  const navigate = useNavigate();
  const location = useLocation(); // location 훅 사용하여 전달된 상태 가져오기
  const boardId = location.state?.boardId || 2; // boardId를 location 상태에서 가져오고 기본값은 2로 설정
  const { state } = useLocation(); // 이전 페이지에서 전달된 상태

  // 로그인된 사용자 UserName을 localStorage에서 가져옴
  const userName = localStorage.getItem("userName");
  console.log("userName from localStorage:", userName); // userName 로그 출력

  // 컴포넌트가 처음 렌더링될 때 상태를 설정
  useEffect(() => {
    if (state) {
      console.log("PostWrite state:", state); // state 전체 출력
      const { title, content, postId } = state; // 이전 페이지에서 받은 데이터
      setTitle(title || ""); // 제목 설정
      setContent(content || ""); // 내용 설정
      setPostID(postId || ""); // 게시물 고유 번호 설정
    } else {
      setTitle(""); // 초기화
      setContent(""); // 초기화
      setPostID(""); // 초기화
      console.log("No state received"); // state가 없을 경우 로그 출력
    }
  }, [state]);

    // boardId에 따라 해당 게시판 URL로 이동하도록 수정
const handleGoToList = () => {
  const boardUrlMap: { [key: number]: string } = {
    1: "/QnA",
    2: "/Certificate",
    3: "/Share",
    4: "/FreePost",
    5: "/Mentor_mentee",
    6: "/Project",
    7: "/Coding",
    8: "/Marketplace",
    9: "/Ledger",
    // 추가 게시판이 있다면 여기서 추가
  };
  const boardUrl = boardUrlMap[boardId] || "/Main"; // 기본값은 Main
  navigate(boardUrl);
};

  // 게시물 제출 함수
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    console.log("handleSubmit called"); // 함수 호출 확인
    const userID = localStorage.getItem("memberId");

    try {
      if (!userName) {
        setErrorMessage("로그인 정보가 없습니다. 다시 로그인해주세요.");
        return;
      }

      // 현재 시간을 한국 시간대로 변환
      const updatedTime = new Date().toLocaleString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      // 수정하는 경우 ID가 있을 때 PUT 요청
      if (state && state.postId) {
        console.log("Updating post with ID:", state.postId); // ID 확인
        const response = await axios.put(
          `http://localhost:8080/api/posts/${state.postId}`, // 수정할 게시물의 ID를 포함한 URL
          {
            title: title,
            content: content,
            boardId: boardId, // 동적으로 boardId 설정
            postId: state.postId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // 토큰 추가
            },
          }
        );
        console.log("Response from server:", response.data);

        if (response.status === 200) {
          // 수정 후 해당 게시물 상세 페이지로 이동, 상태 전달 추가
          navigate(`/PostDetail/${state.postId}`, {
            state: {
              title: title,
              content: content,
              userName: userName,
              time: updatedTime, // 수정 시간을 현재 시간으로 설정
              postId: state.postId, // 게시물 ID 추가
            },
          });
        } else {
          setErrorMessage("게시물 수정에 실패했습니다.");
        }
      } else {
        // 새로 작성하는 경우 POST 요청
        const response = await axios.post(
          "http://localhost:8080/api/posts", // 백엔드 URL
          {
            title: title,
            content: content,
            userName: userName,
            time: updatedTime, // 작성 시간을 한국 시간으로 설정
            boardId: boardId, // 동적으로 boardId 설정
            userId: userID,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          const userLevelExperience = 10;
          await axios.put(`/api/auth/experience`, {
            userId: userID,
            userLevelExperience,
          });
         // boardId에 따라 해당 게시판 URL로 리다이렉트
         const boardUrlMap: { [key: number]: string } = {
          1: "/QnA",
          2: "/Certificate",
          3: "/Share",
          4: "/FreePost",
          5: "/Mentor_mentee",
          6: "/Project",
          7: "/Coding",
          8: "/Marketplace",
          9: "/Ledger",
          // 추가 게시판이 있다면 여기서 추가
        };
      
        const boardUrl = boardUrlMap[boardId] || "/Main"; // 기본값은 Main
        navigate(boardUrl);
        } else {
          setErrorMessage("게시물 작성에 실패했습니다.");
        }
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
          <h3
            className="PostWrite_title"
            onClick={() => (window.location.href = "/Certificate")}
          >
            게시물 작성
          </h3>

          <label className="postWrite__label" htmlFor="post_title"></label>
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

          <label className="postWrite__label" htmlFor="post_content"></label>
          <textarea
            className="post_textarea"
            id="post_content"
            placeholder="내용을 입력해주세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <br />

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <div className="PostWrite_btns">
          <button className="PostWrite_golist" onClick={handleGoToList}>
                 목록
             
            </button>
            <button className="post_button" type="submit">
              {state && state.postId ? "수정하기" : "작성하기"}
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default PostWrite;
