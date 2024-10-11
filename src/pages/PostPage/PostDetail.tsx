import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios"; // axios 추가
import Header from "../Header";
import "../../assets/css/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";

const PostDetail = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, content, userName, time, postId } = state || {}; // postId 추가
  console.log("PostDetail state:", state); // state의 내용을 확인합니다.

  // 하트 수 상태
  const [heartCount, setHeartCount] = useState(0);
  const [heart, setHeart] = useState(false);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 하트 수를 가져옵니다.
    const fetchHeartCount = async () => {
      try {
        const response = await axios.get(`/api/posts/${postId}/hearts`); // 게시글의 하트 수를 가져오는 API
        setHeartCount(response.data.heartCount); // 응답에서 하트 수 설정
      } catch (error) {
        console.error("하트 수를 가져오는 데 실패했습니다.", error);
      }
    };

    fetchHeartCount();
  }, [postId]);

  // 하트 클릭 이벤트
  const handleHeart = async () => {
    setHeart(!heart);
    const newHeartCount = heart ? heartCount - 1 : heartCount + 1; // 하트 클릭 시 하트 수 업데이트

    try {
      await axios.post(`/api/posts/${postId}/hearts`, { heart: !heart }); // 하트 수를 업데이트하는 API
      setHeartCount(newHeartCount); // 상태 업데이트
    } catch (error) {
      console.error("하트 수를 업데이트하는 데 실패했습니다.", error);
    }
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
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  return (
    <>
      <Header />
      <div className="PostDetail_layout">
        <h3 className="postpage_title" onClick={() => navigate("/Certificate")}>자격증게시판</h3>
        <div className="PostDetail_box">
          <div className="PostDetail_profile">
            <div className="PostDetail_proImage"></div>
            <div className="">
              <div className="PostDetail_writer">{userName || "작성자"}</div>
              <div className="PostDetail_time">{time ? formatDate(time) : "몇 분전"}</div>
            </div>
          </div>
          <div className="PostDetail_postTitle">{title || "제목"}</div>
          <div className="PostDetail_content">{content || "내용"}</div>
          <div className="PostDetail_total">
            <div className="PostDetail_totallike" onClick={handleHeart}>
              {heart ? <FaHeart color="red" /> : <FaRegHeart />}
              <span>{heartCount}</span> {/* 하트 수 표시 */}
            </div>
            <div className="PostDetail_totalcomm">
              <FaRegComment />
            </div>
            <div className="PostDetail_totalscrap" onClick={handleBookmark}>
              {bookmark ? <FaBookmark color="gold" /> : <FaRegBookmark />}
            </div>
          </div>
        </div>
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
        <div className="PostDetail_commWritebox">
          <input className="PostDetail_commWrite" placeholder="댓글을 입력하세요." />
          <button className="PostDetail_button">작성</button>
        </div>
        <div className="PostDetail_postlistbtn" onClick={() => navigate("/Certificate")}>글 목록</div>
      </div>
    </>
  );
};

export default PostDetail;
