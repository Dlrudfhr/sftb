import React, { useState, useRef } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Header from "../Header";
import "../../assets/css/PostPage/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart ,FaBookmark } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";

const PostDetail = () => {
    const commentElement = useRef<null | HTMLInputElement>(null); //스크롤 될 첫번째 위치요소

    //버튼 클릭시 ref를 받아와 요소로 이동하는 스크롤 이벤트
    const onMoveBox = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        ref.current?.focus();
    };


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

    {/*댓글 하트 클릭 이벤트 */}
    const [comheart, setcomHeart] = useState(false);
    const handlecomHeart = () => {
      setcomHeart(!comheart);
    }


  return(
    <>
    <Header />
    <div className="PostDetail_layout">
        {/*게시판 타이틀 */}
        <h3 className="postpage_title" onClick={() => (window.location.href = "/Certificate")}>
            <div className="PostDetail_titleinnerbox">자격증게시판</div>
        </h3>
        {/*게시글 출력 박스 */}
        <div className="PostDetail_box">
            <div className="PostDetail_innerbox">
                {/*게시글 작성자 */}
                <div className="PostDetail_profile">
                    <div className="PostDetail_proImage">{/*<img src={catImage}/>*/}</div>
                    <div className="">
                        <div className="PostDetail_writer">작성자</div>
                        <div className="PostDetail_time">몇 분전</div>
                    </div>
                </div>
                {/*게시글 제목&내용 */}
                <div className="PostDetail_postTitle">제목</div>
                <div className="PostDetail_content">내용
                </div>

                {/*게시글 좋아요,댓글 수, 스크랩 수 */}
                <div className="PostDetail_total">
                    <div className="PostDetail_totallike" onClick={handleHeart}>{heart ? (<FaHeart color="red"/>) : (<FaRegHeart />)}</div>
                    <div className="PostDetail_totalcomm" onClick={() => onMoveBox(commentElement)}><FaRegComment /></div>
                    <div className="PostDetail_totalscrap" onClick={handleBookmark}>{bookmark ? (<FaBookmark color="gold" />) : (<FaRegBookmark />)}</div>
                </div>
            </div>
        </div>

        {/*게시글 댓글 출력 영역 */}
        <div className="PostDetail_commentbox">
            <div className="PostDetail_commentinnerbox">
                {/*게시글 댓글 */}
                <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage"><img src={myImage}/></div>
                    <div className="PostDetail_commwriter">작성자</div>
                    <div className="PostDetail_recomm" onClick={() => onMoveBox(commentElement)}>대댓글</div>
                    <div className="PostDetail_recommlike"  onClick={handlecomHeart}>{comheart ? (<FaHeart color="red"/>) : (<FaRegHeart />)}</div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
                <div className="PostDetail_time">12분전</div>
            </div>

        </div>

        {/*게시글 대댓글 */}
        <div className="PostDetail_rerecomm">
            <div className="PostDetail_rereinnerbox">
                <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage"><img src={myImage}/></div>
                    <div className="PostDetail_commwriter">작성자</div>
                    <div className="PostDetail_recommlike" /*onClick={}*/><FaRegHeart /></div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
                <div className="PostDetail_time">12분전</div>
            </div>
        </div>
        
        <div className="PostDetail_rerecomm">
            <div className="PostDetail_rereinnerbox">
                <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage"><img src={myImage}/></div>
                    <div className="PostDetail_commwriter">작성자</div>
                    <div className="PostDetail_recommlike" /*onClick={}*/><FaRegHeart /></div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
                <div className="PostDetail_time">12분전</div>
            </div>
        </div>

        <div className="PostDetail_rerecomm">
            <div className="PostDetail_rereinnerbox">
                <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage"><img src={myImage}/></div>
                    <div className="PostDetail_commwriter">작성자</div>
                    <div className="PostDetail_recommlike" /*onClick={}*/><FaRegHeart /></div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
                <div className="PostDetail_time">12분전</div>
            </div>
        </div>

        <div className="PostDetail_rerecomm">
            <div className="PostDetail_rereinnerbox">
                <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage"><img src={myImage}/></div>
                    <div className="PostDetail_commwriter">작성자</div>
                    <div className="PostDetail_recommlike" /*onClick={}*/><FaRegHeart /></div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
                <div className="PostDetail_time">12분전</div>
            </div>
        </div>

        <div className="PostDetail_rerecomm">
            <div className="PostDetail_rereinnerbox">
                <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage"><img src={myImage}/></div>
                    <div className="PostDetail_commwriter">작성자</div>
                    <div className="PostDetail_recommlike" /*onClick={}*/><FaRegHeart /></div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont">댓글 내용</div>
                <div className="PostDetail_time">12분전</div>
            </div>
        </div>
        

        {/*게시글 댓글 작성 영역 */}
        <div className="PostDetail_commWritebox" >
            <input className="PostDetail_commWrite" placeholder="댓글을 입력하세요." ref={commentElement}></input>
            <button className="PostDetail_button"><FaPaperPlane /></button>
        </div>

        {/*게시판 목록 버튼 */}
        <div className="PostDetail_postlistbtn"  onClick={() => (window.location.href = "/Certificate")}>글 목록</div>
    </div>

    </>


  );
};
export default PostDetail;