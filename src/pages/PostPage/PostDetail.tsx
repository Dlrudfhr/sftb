import React, { useState, useRef, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import "../../assets/css/PostPage/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import {FaRegComment, FaRegHeart, FaRegBookmark, FaHeart,FaBookmark,} from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";


interface Comment {
    commentId: number;
    content: string;
    memberId: string;
    createdAt: string;
    replies?: Comment[];
}

const PostDetail: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation(); // Certificate에서 전달된 state를 받음
    const { title, content, userName, time } = state || {}; // state가 없을 경우를 대비해 기본값 처리
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentInput, setCommentInput] = useState("");
    const [replyInput, setReplyInput] = useState<{ [key: number]: string }>({});
    const { postId } = useParams<{ postId: string }>();
    const commentElement = useRef<null | HTMLInputElement>(null); //스크롤 될 첫번째 위치요소
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleMoreClick = () => {
        setShowDropdown(!showDropdown);
    }

    //버튼 클릭시 ref를 받아와 요소로 이동하는 스크롤 이벤트
    const onMoveBox = (ref: React.RefObject<HTMLInputElement>) => {
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        ref.current?.focus();
    };

    {/*하트 클릭 이벤트 */}
    const [heart, setHeart] = useState(false);
    const handleHeart = () => {
        setHeart(!heart);
    };
    
    {/*댓글 하트 클릭 이벤트 */}
    const [comheart, setcomHeart] = useState(false);
    const handlecomHeart = () => {
        setcomHeart(!comheart);
    }

    // 북마크 클릭 이벤트
    const [bookmark, setBookmark] = useState(false);
    const handleBookmark = () => {
        setBookmark(!bookmark);
    };
    
    // 댓글 가져오는 함수
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comments/${postId}`);
            console.log(response.data); // 데이터 확인
            setComments(response.data);
        } catch (error) {
            console.error("댓글 가져오기 실패:", error);
        }
    };
    
    // 댓글 추가하는 함수
    const handleCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!commentInput) return;
        const userName = localStorage.getItem("userName"); // 로컬 스토리지에서 userName 가져오기
        console.log("Comment Input:", commentInput);
        console.log("Post ID:", postId);
        console.log("User Name:", userName);
        try {
            await axios.post('/api/comments', { 
                postId: postId, 
                content: commentInput,
                memberId: userName
            });
            setCommentInput("");
            fetchComments();
        } catch (error) {
            console.error("댓글 추가 실패:", error);
        }
    };

    // 대댓글 추가하는 함수
    const handleReplySubmit = async (e: React.MouseEvent<HTMLButtonElement>, parentId: number) => {
        e.preventDefault();
        if (!replyInput[parentId]) return;
                
        const userName = localStorage.getItem("userName"); // 사용자 이름 가져오기
        if (!userName) {
            console.error("User Name is null");
            return; // 사용자 이름이 없으면 함수 종료
        }
        try {
            await axios.post('/api/comments', { 
                postId, 
                parentId, 
                content: replyInput[parentId],
                memberId: userName // memberId에 사용자 이름 추가
            });
            setReplyInput({ ...replyInput, [parentId]: "" });
            fetchComments(); // 댓글 목록 갱신
        } catch (error) {
            console.error("대댓글 추가 실패:", error);
        }
    };

    //대댓글 토글 함수
    const [isReplyVisible, setIsReplyVisible] = useState<{ [key: number]: boolean }>({});
    const toggleReplyVisibility = (commentId: number) => {
        setIsReplyVisible((prev) => ({
            ...prev,
            [commentId]: !prev[commentId], // 해당 댓글의 ID를 사용하여 토글
        }));
    };

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


  
  useEffect(() => {
    fetchComments();
  }, [postId]);

  return (
    <>
      <Header />
      <div className="PostDetail_layout">
        {/*게시판 타이틀 */}
        <h3
          className="postpage_title"
          onClick={() => (window.location.href = "/Certificate")}
        >
          <div className="PostDetail_titleinnerbox">자격증게시판</div>
        </h3>

        {/*게시글 출력 박스 */}
        <div className="PostDetail_box">
            <div className="PostDetail_innerbox">
                {/*게시글 작성자 */}
                <div className="PostDetail_profile">
                    <div className="PostDetail_proImage">{/*<img src={catImage}/>*/}</div>
                    <div className="PostDetail_middle">
                        <div className="PostDetail_writer">{userName || "작성자"}</div>
                        <div className="PostDetail_time">{formatDate(time) || "몇 분전"}</div>
                    </div>
                    <div className="PostDetail_more">
                        <div  onClick={handleMoreClick}><FiMoreHorizontal /></div>
                        {showDropdown && (
                            <ul className="PostDetail_dropdown">
                                {/* 수정하기 버튼 추가 */}
                                <li className="PostDetail_editButton" onClick={handleEdit}>
                                수정하기
                                </li>
                                <li>삭제하기</li>
                            </ul>
                        )}
                    </div>
                </div>

                {/*게시글 제목&내용 */}
                <div className="PostDetail_postTitle">{title || "제목"}</div>
                <div className="PostDetail_content">{content || "내용"}</div>

                {/*게시글 좋아요,댓글 수, 스크랩 수 */}
                <div className="PostDetail_total">
                    <div className="PostDetail_totallike" onClick={handleHeart}>{heart ? (<FaHeart color="red"/>) : (<FaRegHeart />)}</div>
                    <div className="PostDetail_totalcomm" onClick={() => onMoveBox(commentElement)}><FaRegComment /></div>
                    <div className="PostDetail_totalscrap" onClick={handleBookmark}>{bookmark ? (<FaBookmark color="gold" />) : (<FaRegBookmark />)}</div>
                </div>
                
            </div>
                    

          
        </div>

        {/*댓글 출력 영역 */}
        <div className="PostDetail_commentbox">
            {comments.map(comment => (
                <div className="PostDetail_comment" key={comment.commentId}>
                    <div className="PostDetail_writer">
                        <div className="PostDetail_commproImage">
                            <img src={myImage} alt="프로필" />
                        </div>
                        <div className="PostDetail_commwriter">{comment.memberId}</div>
                        <div className="PostDetail_postwriter">작성자</div>
                        <div className="PostDetail_combtn">
                            <div className="PostDetail_viewwrite" onClick={() => toggleReplyVisibility(comment.commentId)} >
                                <FaRegComment />
                            </div>
                            <div className="PostDetail_heart"><FaRegHeart /></div>
                            <div className="PostDetail_adopt"><AiOutlineLike /></div> 
                        </div>
                    </div>
                    
                    <div className="PostDetail_content PostDetail_comm_cont">{comment.content}</div>
                    <div className="PostDetail_time">{formatDate(comment.createdAt)}</div>
                    {/*대댓글 출력 영역*/}
                    {comment.replies && comment.replies.map(reply => (
                        <div className="PostDetail_recomment" key={reply.commentId}>
                            <div className="PostDetail_writer">
                                <div className="PostDetail_commproImage"> <img src={myImage} alt="프로필" /> </div>
                                <div className="PostDetail_commwriter">{reply.memberId}</div>
                                <div className="PostDetail_postwriter">작성자</div>
                                <div className="PostDetail_combtn">
                                    
                                    <div className="PostDetail_heart"><FaRegHeart /></div>
                                    <div className="PostDetail_adopt"><AiOutlineLike /></div> 
                                </div>
                            </div>
                             <div className="PostDetail_content PostDetail_comm_cont">{reply.content}</div>
                                <div className="PostDetail_time">{formatDate(reply.createdAt)}</div>
                        </div>
        ))}

                    {/*대댓글 숨기기/보여지기 */}
                    {isReplyVisible[comment.commentId] && (
                        <div className="reply">
                            {/* 대댓글 작성 영역 */}
                            <div className="PostDetail_rerecomm">
                                <div className="PostDetail_writer">
                                    <div className="PostDetail_commproImage">
                                        <img src={myImage} alt="프로필" />
                                    </div>
                                    {/* 기본값을 설정하여 memberId가 null일 경우 "작성자"로 표시 */}
                                    <div className="PostDetail_commwriter">{localStorage.getItem("userName") || "작성자"}</div> 
                                </div>
                                                    
                                <input
                                        className="PostDetail_commWrite"
                                        placeholder="대댓글을 입력하세요."
                                        value={replyInput[comment.commentId] || ""}
                                        onChange={(e) => setReplyInput({ ...replyInput, [comment.commentId]: e.target.value })}
                                />
                                <button className="PostDetail_button" onClick={(e) => handleReplySubmit(e, comment.commentId)}><FaPaperPlane /></button>
                            </div>       
                        </div>
                    )}
                </div>
            ))}
        </div>
        
        
        {/* 댓글 작성 영역 */}
        <div className="PostDetail_commWritebox">
            <input
                className="PostDetail_commWrite"
                placeholder="댓글을 입력하세요."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
            />
            <button className="PostDetail_button" onClick={handleCommentSubmit}><FaPaperPlane /></button>
        </div>

        {/* 게시판 목록 버튼 */}
        <div className="PostDetail_postlistbtn" onClick={() => navigate("/Certificate")}>글 목록</div>
        
    </div>

    
    </>
    );
};

export default PostDetail;
