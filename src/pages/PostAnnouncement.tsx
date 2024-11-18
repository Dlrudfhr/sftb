import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Header from "./Header";
import "../assets/css/PostPage/PostDetail.css";
import {
  FaRegComment,
  FaRegHeart,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoEyeSharp } from "react-icons/io5";
import { getTierImage } from "./TierImageUtils";

const PostAnnouncement: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, content, userName, time, newTime, boardId, postId, userId, fileName } = state || {};
  const commentElement = useRef<null | HTMLInputElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [comDropdown, setcomDropdown] = useState(false);
  const [postwriterTier, setPostUserTier] = useState(0);
  const [imageSrc, setImageSrc] = useState(""); // 기본 이미지를 설정
  const [viewCount, setViewCount] = useState(0); // 조회수 상태
  const [bookmark, setBookmark] = useState(false); // 북마크 상태
  const fetchpostwriterTier = async () => {
    try {
      if (userId) {
        // 경험치랑 티어 경험치 데이터를 가져오는 API 호출
        const response = await axios.get(
          `http://localhost:8080/api/auth/users/${userId}/experience`
        );
        setPostUserTier(response.data.userTier);
      }
    } catch (error) {
      console.error("경험치 데이터를 가져오는 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    const Imageload = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/files/${postId}`, {
              responseType: "blob", // 이미지 데이터를 blob 형식으로 받아옴
            });

            // Blob 데이터를 URL로 변환하여 이미지 소스로 사용
            const imageUrl = URL.createObjectURL(response.data);
            setImageSrc(imageUrl); // setImageSrc에 이미지 URL 설정
        } catch (error) {
            console.error("Error fetching the image:", error);
        }
    };

    Imageload();

    return () => {
        // 클린업 함수로 URL 객체 해제
        if (imageSrc) {
            URL.revokeObjectURL(imageSrc);
        }
    };
  }, [postId]);

  
  //
  const handleMoreClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleFNDClick = () => {
    setcomDropdown(!comDropdown);
  };

  const boardUrlMap: { [key: number]: string } = {
    10 : "/main/Announcement"
  };

  // boardId에 따른 제목 매핑
  const boardTitleMap: { [key: number]: string } = {
    10 : "공지사항 게시판"
  };

  // 시간을 포맷하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };
  //버튼 클릭시 ref를 받아와 요소로 이동하는 스크롤 이벤트
  const onMoveBox = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    ref.current?.focus();
  };
  // 현재 로그인한 사용자 ID 가져오기
  const getCurrentUserId = () => {
    return localStorage.getItem("memberId"); // 로컬 스토리지에서 사용자 ID 가져오기
  };

  // 하트 상태 및 하트 수 상태 추가
  const [heart, setHeart] = useState(false);
  const [heartCount, setHeartCount] = useState(0);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 하트 수를 가져옵니다.
    const incrementViewCount = async () => {
      try {
        await axios.post(`http://localhost:8080/api/posts/${postId}/incrementViewCount`);
        // 조회수 업데이트 후 최신 조회수 가져오기
        const response = await axios.get(`http://localhost:8080/api/posts/${postId}`);
        setViewCount(response.data.viewCount); // 최신 조회수 설정
      } catch (error) {
        console.error("Error incrementing view count:", error);
      }
    };

    //하트수를 가져오는 API
    const fetchHeartCount = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}`); // 하트 수를 가져오는 API 호출
        setHeartCount(response.data.heart); // 응답에서 하트 수 설정
      } catch (error) {
        console.error("하트 수를 가져오는 데 실패했습니다.", error);
      }
    };
    
    //하트 상태를 가져오는 API
    const fetchHeartStatus = async () => {
      const userId = getCurrentUserId();
      try {
        const response = await axios.get(`/api/posts/${postId}/hearts`,{
          params: { userId }
        });
        setHeart(response.data); // 하트 상태 설정
      } catch (error) {
          console.error("하트 상태를 가져오는 데 실패했습니다.", error);  
      }
    };
    const fetchPostDetails = async () => {
      const userId = getCurrentUserId();
      const response = await axios.get(`/api/posts/${postId}/bookmarks`, {
          params: { userId } // 사용자 ID를 쿼리 파라미터로 전달
      });
      setBookmark(response.data); // 북마크 상태 설정
    };
    
    fetchHeartStatus();
    fetchPostDetails();
    incrementViewCount();
    fetchpostwriterTier();
    fetchHeartCount();
  }, [postId]);

  // 하트 클릭 이벤트
  const handleHeart = async () => {
    const newHeartState = !heart; // 새로운 하트 상태
    const newHeartCount = heart ? heartCount - 1 : heartCount + 1;
    const userId = getCurrentUserId();
    try {
      await axios.post(`/api/posts/${postId}/hearts/toggle`, { userId : userId }); // 하트 상태 업데이트 API 호출
      setHeart(newHeartState); // 하트 상태 업데이트
      setHeartCount(newHeartCount);
    } catch (error) {
      console.error("하트 수를 업데이트하는 데 실패했습니다.", error);
    }
  };

 // 게시물 삭제 함수
const handleDeletePost = async () => {
  try {
    const confirmDelete = window.confirm("정말로 이 게시물을 삭제하시겠습니까?");
    if (!confirmDelete) return;

    // 게시물 삭제 요청
    const response = await axios.delete(
      `http://localhost:8080/api/posts/${state.postId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 200) {
      alert("게시물이 삭제되었습니다.");
      navigate("/main/Announcement"); // 삭제 후 목록으로 이동
    } else {
      alert("게시물 삭제에 실패했습니다.");
    }
  } catch (error) {
    console.error("게시물 삭제 중 오류 발생:", error);
    alert("게시물 삭제에 실패했습니다.");
  }
};

  //북마크 클릭 함수
  const handleBookmark = async () => {
    const userId = getCurrentUserId();
    console.log("북마크 버튼 클릭"); // 추가
    setBookmark(!bookmark); // 북마크 상태 전환

    try {
        await axios.post(`/api/posts/${postId}/bookmarks`, null, {
            params: { userId } // 사용자 ID를 쿼리 파라미터로 전달
        });
    } catch (error) {
        console.error("북마크 상태를 업데이트하는 데 실패했습니다.", error);
    }
  };

  //게시글 수정하는함수
  const handleEdit = () => {
    console.log("Editing post with ID:", postId); // ID 로그 확인
    if (!postId) {
      console.error("Post ID is undefined!");
      return; // postId가 없으면 함수 종료
    }
    // 수정된 시간은 현재 시간으로 설정
    const updatedTime = new Date().toISOString(); // 현재 시간을 ISO 형식으로 가져오기
    navigate("/PostWrite", {
      state: {
        title,
        content,
        userName,
        newTime, // 수정된 시간을 현재 시간으로 설정
        postId, // 게시물 ID 추가
        userId, // userId 추가
        boardId,
        fileName,
      },
    });
  };

  return (
    <>
      <Header />
      <div className="PostDetail_layout">
        {/*게시판 타이틀 */}
        <h3
          className="postpage_title"
          onClick={() => (window.location.href = "/Certificate")}
        >
          <div className="PostDetail_titleinnerbox">
            {boardTitleMap[boardId] || "게시판"}{" "}
            {/* boardId에 맞는 제목 출력 */}
          </div>
        </h3>

        {/*게시글 출력 박스 */}
        <div className="PostDetail_box">
          <div className="PostDetail_innerbox">
            {/* 게시글 작성자 목록 출력 */}
            <div className="PostDetail_profile">
              <div className="PostDetail_proImage">
                <img src = {getTierImage(postwriterTier)} 
                 alt={`${postwriterTier}`}
                />
              </div>
              <div className="PostDetail_middle">
                <div className="PostDetail_writer">{userName || "작성자"}</div>
                <div className="PostDetail_time">
                  {newTime
                    ? formatDate(newTime)
                    : time
                    ? formatDate(time)
                    : "몇 분전"}
                </div>
                <div className="PostDetail_more">
                  <div onClick={handleMoreClick}>
                    <FiMoreHorizontal />
                  </div>
                  {state.userId === getCurrentUserId() && ( // 현재 사용자 ID와 작성자 ID 비교
                    <>
                      {showDropdown && (
                        <ul className="PostDetail_dropdown">
                          {/* 수정하기 버튼 추가 */}

                          <li
                            className="PostDetail_editButton"
                            onClick={handleEdit} // postId를 사용하여 수정
                          >
                            수정하기
                          </li>
                          <li
                            className="PostDetail_editButton"
                            onClick={handleDeletePost}
                          >
                            삭제하기
                          </li>
                        </ul>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/*게시글 제목&내용 */}
            <div className="PostDetail_postTitle">{title || "제목"}</div>
            <div className="PostDetail_content">{content || "내용"}</div>

            {/* 글 내용 아래에 이미지 표시 */}
            {imageSrc && (
              <div className="PostDetail_image">
                <img src={imageSrc} alt="게시글 이미지" style={{ width: "70%", height: "auto" }} />
              </div>
             )}

            {/*게시글 좋아요,댓글 수, 스크랩 수 */}
            <div className="PostDetail_total">
              <div className="PostDetail_totallike" onClick={handleHeart}>
                {heart ? <FaHeart color="red" /> : <FaRegHeart />}
                <span> {heartCount}</span> {/* 하트 수 표시 */}
              </div>
              <div
                className="PostDetail_totalcomm"
                onClick={() => onMoveBox(commentElement)}
              >
                <FaRegComment />
              </div>
              <div className="PostDetail_totalscrap" onClick={handleBookmark}>
                {bookmark ? <FaBookmark color="gold" /> : <FaRegBookmark />}
              </div>
              {/* 조회수 표시 */}
              <div className="PostDetail_viewCount"> <IoEyeSharp /> {viewCount || 0}</div>
            </div>
          </div>
        </div>
        {/* 게시판 목록 버튼 */}
        <div
          className="PostDetail_postlistbtn"
          onClick={() => navigate(boardUrlMap[boardId])}
        >
          글 목록
        </div>
      </div>
    </>
  );
};

export default PostAnnouncement;
