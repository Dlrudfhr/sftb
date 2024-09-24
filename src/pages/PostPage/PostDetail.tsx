import React from "react";
import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "../Header";
import "../../assets/css/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import { FaRegHeart, FaRegBookmark, FaHeart ,FaBookmark } from "react-icons/fa";

const PostDetail = () => {
    {/*하트 클릭 이벤트 */}
    const [heart, setHeart] = useState(false);
    const handleHeart = () => {
      setHeart(!heart);
    }

    {/*북마크 클릭 이벤트 */}
    const [bookmark, setBoomark] = useState(false);
    const handleBookmark = () => {
        setBoomark(!bookmark);
    }

  return(
    <>
    <Header />
    <div className="PostDetail_layout">
        {/*게시판 타이틀 */}
        <h3 className="postpage_title" onClick={() => (window.location.href = "/Certificate")}>자격증게시판</h3>
        {/*게시글 출력 박스 */}
        <div className="PostDetail_box">
            {/*게시글 작성자 */}
            <div className="PostDetail_profile">
                <div className="PostDetail_proImage">{/*<img src={catImage}/>*/}</div>
                <div className="">
                    <div className="PostDetail_writer">작성자</div>
                    <div className="PostDetail_time">몇 분전</div>
                </div>
            </div>
            
            <div className="PostDetail_postTitle">제목</div>
            <div className="PostDetail_content">내용
            </div>

            {/*게시글 좋아요, 스크랩 수 */}
            <div className="PostDetail_total">
                <div className="PostDetail_totallike">좋아요 수</div>
                <div className="PostDetail_totalcomm">댓글 수 </div>
                <div className="PostDetail_totalscrap">스크랩 수</div>
            </div>

            {/*게시글 좋아요, 스크랩 버튼 */}
            <div>
                <button className="PostDetail_likebutton"  
                    onClick={handleHeart}>{heart ? (<FaHeart />) : (<FaRegHeart />)}</button>
                <button className="PostDetail_scrapbutton" 
                    onClick={handleBookmark}>{bookmark ? (<FaBookmark  />) : (<FaRegBookmark />)}    </button>
            </div>
        </div>

        {/*게시글 댓글 출력 영역 */}
        <div className="PostDetail_commentbox">
            <div className="PostDetail_comment">
                {/*게시글 댓글 */}
                <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage"><img src={myImage}/></div>
                    <div className="PostDetail_commwriter">작성자</div>
                    <div className="PostDetail_recomm">대댓글</div>
                    <div className="PostDetail_recommlike">공감</div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
                <div className="PostDetail_time">12분전</div>
            </div>

        </div>
        {/*게시글 대댓글 */}
        <div className="PostDetail_rerecomm">
            <div className="PostDetail_writer">
                <div className="PostDetail_commproImage"><img src={myImage}/></div>
                <div className="PostDetail_commwriter">작성자</div>
                <div className="PostDetail_recommlike">공감</div>
            </div>
            <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
            <div className="PostDetail_time">12분전</div>
        </div>
        

        {/*게시글 댓글 작성 영역 */}
        <div className="PostDetail_commWritebox">
            <input className="PostDetail_commWrite" placeholder="댓글을 입력하세요."></input>
            <button className="PostDetail_button">작성</button>
        </div>

        {/*게시판 목록 버튼 */}
        <div className="PostDetail_postlistbtn"  onClick={() => (window.location.href = "/Certificate")}>글 목록</div>
    </div>

    </>


  );
};
export default PostDetail;