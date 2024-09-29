import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
import { useState } from "react";
import Header from "../Header";
import "../../assets/css/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";

const PostDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation(); // Certificate에서 전달된 state를 받음
  const { title, content, userName, time } = state || {}; // state가 없을 경우를 대비해 기본값 처리

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
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`; // 원하는 형식으로 반환
  };

  return (
    <>
      <Header />
      <div className="PostDetail_layout">
        {/* 게시판 타이틀 */}
        <h3 className="postpage_title" onClick={() => navigate("/Certificate")}>자격증게시판</h3>
        {/* 게시글 출력 박스 */}
        <div className="PostDetail_box">
          {/* 게시글 작성자 */}
          <div className="PostDetail_profile">
            <div className="PostDetail_proImage">{/*<img src={catImage}/>*/}</div>
            <div className="">
              <div className="PostDetail_writer">{userName || "작성자"}</div>
              <div className="PostDetail_time">{time ? formatDate(time) : "몇 분전"}</div> {/* 생성 시간을 포맷하여 보여줌 */}
            </div>
          </div>
          {/* 게시글 제목&내용 */}
          <div className="PostDetail_postTitle">{title || "제목"}</div>
          <div className="PostDetail_content">{content || "내용"}</div>

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
            <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
            <div className="PostDetail_time">12분전</div>
          </div>
        </div>

        {/* 게시글 댓글 작성 영역 */}
        <div className="PostDetail_commWritebox">
          <input className="PostDetail_commWrite" placeholder="댓글을 입력하세요." />
          <button className="PostDetail_button">작성</button>
        </div>

        {/* 게시판 목록 버튼 */}
        <div className="PostDetail_postlistbtn" onClick={() => navigate("/Certificate")}>글 목록</div>
      </div>
    </>
  );
};

export default PostDetail;
