import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../Header";
import "../../assets/css/PostDetail.css";
import axios from "axios";
import myImage from "../../assets/images/manggu.jpg";
import {
  FaRegComment,
  FaRegHeart,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";

const PostDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Certificate에서 전달된 state를 받음
  console.log("Received state:", state); // 상태 로그 확인
  const { title, content, userName, time, postId } = state || {}; // id 추가

  // 하트 클릭 이벤트
  const [heart, setHeart] = useState(false);
  const handleHeart = () => {
    setHeart(!heart);
  };

  // 북마크 클릭 이벤트
  const [bookmark, setBookmark] = useState(false);
  const handleBookmark = () => {
    setBookmark(!bookmark);
  };

  // 시간을 포맷하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`; // 원하는 형식으로 반환
  };

  // 수정하기 버튼 클릭 핸들러
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
        time: updatedTime, // 수정된 시간을 현재 시간으로 설정
        postId, // 게시물 ID 추가
      },
    });
  };

  return (
    <>
      <Header />
      <div className="PostDetail_layout">
        {/* 게시판 타이틀 */}
        <h3 className="postpage_title" onClick={() => navigate("/Certificate")}>
          자격증게시판
        </h3>
        {/* 게시글 출력 박스 */}
        <div className="PostDetail_box">
          {/* 게시글 작성자 */}
          <div className="PostDetail_profile">
            <div className="PostDetail_proImage"></div>
            <div className="">
              <div className="PostDetail_writer">{userName || "작성자"}</div>
              <div className="PostDetail_time">
                {time ? formatDate(time) : "몇 분전"}
              </div>
            </div>
          </div>
          {/* 게시글 제목&내용 */}
          <div className="PostDetail_postTitle">{title || "제목"}</div>
          <div className="PostDetail_content">{content || "내용"}</div>

          {/* 수정하기 버튼 추가 */}
          <button className="PostDetail_editButton" onClick={handleEdit}>
            수정하기
          </button>

          {/* 게시글 좋아요, 댓글 수, 스크랩 수 */}
          <div className="PostDetail_total">
            <div className="PostDetail_totallike" onClick={handleHeart}>
              {heart ? <FaHeart color="red" /> : <FaRegHeart />}
            </div>
            <div className="PostDetail_totalcomm">
              <FaRegComment />
            </div>
            <div className="PostDetail_totalscrap" onClick={handleBookmark}>
              {bookmark ? <FaBookmark color="gold" /> : <FaRegBookmark />}
            </div>
          </div>
        </div>

        {/* 게시글 댓글 출력 영역 */}
        <div className="PostDetail_commentbox">
          <div className="PostDetail_comment">
            <div className="PostDetail_writer">
              <div className="PostDetail_commproImage">
                <img src={myImage} alt="프로필" />
              </div>
              <div className="PostDetail_commwriter">작성자</div>
              <div className="PostDetail_recomm">대댓글</div>
              <div className="PostDetail_recommlike">
                <FaRegHeart />
              </div>
            </div>
            <div className="PostDetail_content PostDetail_comm_cont">
              댓글 내용
            </div>
            <div className="PostDetail_time">12분전</div>
          </div>
        </div>

        {/* 게시글 댓글 작성 영역 */}
        <div className="PostDetail_commWritebox">
          <input
            className="PostDetail_commWrite"
            placeholder="댓글을 입력하세요."
          />
          <button className="PostDetail_button">작성</button>
        </div>

        {/* 게시판 목록 버튼 */}
        <div
          className="PostDetail_postlistbtn"
          onClick={() => navigate("/Certificate")}
        >
          글 목록
        </div>
      </div>
    </>
  );
};

export default PostDetail;
