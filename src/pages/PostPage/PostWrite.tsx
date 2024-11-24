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
  const [file, setFile] = useState<File | null>(null); // 첨부할 사진 파일
  const [filePath, setFilePath] = useState<string | null>(null); // 기존 파일 경로 상태 추가
  const [fileName, setFileName] = useState<string | null>(null); // 선택된 파일 이름 저장 상태 추가

  // 로그인된 사용자 UserName을 localStorage에서 가져옴
  const userName = localStorage.getItem("userName");
  console.log("userName from localStorage:", userName); // userName 로그 출력

  // 컴포넌트가 처음 렌더링될 때 상태를 설정
  useEffect(() => {
    if (state) {
      console.log("PostWrite state:", state); // state 전체 출력
      const { title = "", content = "", postId = "", fileName = null } = state; // 기본값을 추가
      setTitle(title); // 제목 설정
      setContent(content); // 내용 설정
      setPostID(postId); // 게시물 고유 번호 설정
      setFilePath(fileName); // 수정 시 기존 파일 경로 설정
      setFileName(fileName); // 수정 시 기존 파일 이름 설정
    }
  }, [state]);

  // 파일 변경 핸들러
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null); // 선택한 파일을 상태에 저장
    setFileName(selectedFile ? selectedFile.name : null); // 파일 이름 저장
    if (selectedFile) {
      setFilePath(null); // 새 파일 선택 시 기존 파일 경로 제거
    }
  };

  // 파일 삭제 핸들러
  const handleDeleteFile = async () => {
    if (filePath && postId) {
      try {
        await axios.delete(`http://localhost:8080/api/files/${postId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFilePath(null); // 삭제 후 경로 초기화
        setFile(null); // 선택된 파일 상태 초기화
        setFileName(null); // 파일 이름 초기화
        alert("파일이 삭제되었습니다.");
      } catch (error) {
        console.error("파일 삭제 중 오류:", error);
        setErrorMessage("파일 삭제에 실패했습니다.");
      }
    }
  };


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
      10: "/main/Announcement",
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
        console.log("Updating post with ID:", state.postId);

        // 파일을 새로 선택하지 않았을 경우 기존 파일 경로를 유지
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("boardId", String(boardId));
        formData.append("postId", state.postId);
        formData.append("userId", userID || "");

        if (file) {
          formData.append("file", file); // 새 파일 추가
        } else if (filePath) {
          formData.append("filePath", filePath); // 기존 파일 경로 유지
        }
        try {
          const response = await axios.put(
            `http://localhost:8080/api/posts/${state.postId}`, // 수정할 게시물의 ID를 포함한 URL
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );

          if (response.status === 200) {
            // 수정 후 해당 게시물 페이지로 이동
            const destinationPath =
              boardId === 5 || boardId === 6
                ? `/PostAdopt/${state.postId}`
                : boardId === 10
                ? `/PostAnnouncement/${state.postId}`
                : `/PostDetail/${state.postId}`;

            navigate(destinationPath, {
              state: {
                title: title,
                content: content,
                userName: userName,
                time: updatedTime, // 수정 시간을 현재 시간으로 설정
                postId: state.postId, // 게시물 ID 추가
                boardId: state.boardId,
                userId: state.userId,
                filePath: state.fileName,
              },
            });
          } else {
            setErrorMessage("게시물 수정에 실패했습니다.");
          }
        } catch (error) {
          console.error("Error in PUT request:", error); // 에러 내용 출력
          setErrorMessage("서버 오류가 발생했습니다. 다시 시도해주세요.");
        }
      } else {
        // 새로 작성하는 경우 POST 요청
        const formData = new FormData();
        formData.append("title", title);
        formData.append("content", content);
        formData.append("userName", userName);
        formData.append("time", updatedTime);
        formData.append("boardId", String(boardId));
        formData.append("userId", userID || "");

        // 새로 선택된 파일 추가
        if (file) {
          formData.append("file", file); // 새 파일 추가
        }
        const response = await axios.post(
          "http://localhost:8080/api/posts",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
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
            10: "/main/Announcement",
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
          <br />

          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            id="file-upload"
            className="file-input" // 숨김 처리된 input
          />
          <label htmlFor="file-upload" className="PostWrite_filebutton">
            파일 선택
          </label>

          {/* 기존 파일 미리보기 */}
          {filePath && (
            <div className="file-preview">
              <p>
                첨부된 파일:{" "}
                <a
                  href={`http://localhost:8080/api/files/download/${postId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {decodeURIComponent(filePath.split("/").pop() || "")}
                </a>
              </p>
              <button type="button" onClick={handleDeleteFile}>
                삭제
              </button>
            </div>
          )}

          {/* 새로 선택된 파일 미리보기 */}
          {file && (
            <div className="file-preview">
              <p>새 파일: {file.name}</p>
              <button type="button" onClick={() => setFile(null)}>
                삭제
              </button>
            </div>
          )}
          <br/>

          {errorMessage && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errorMessage}
            </div>
          )}
          <button className="PostWrite_golist" onClick={handleGoToList}>
            목록
          </button>
          <button className="post_button" type="submit">
            {state && state.postId ? "수정하기" : "작성하기"}
          </button>
        </form>
      </div>
    </>
  );
}

export default PostWrite;