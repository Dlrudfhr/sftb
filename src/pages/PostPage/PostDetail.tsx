import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../Header";
import "../../assets/css/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
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
    
    // 댓글 가져오는 함수
    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comments/${postId}`);
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

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <>
            <Header />
            <div className="PostDetail_layout">
                <h3 className="postpage_title" onClick={() => navigate("/Certificate")}>자격증게시판</h3>
                <div className="PostDetail_box">
                    {/* 게시글 정보 */}
                    <div className="PostDetail_profile">
                        <div className="PostDetail_proImage">{/* 프로필 이미지 */}</div>
                        <div>
                            <div className="PostDetail_writer">{userName || "작성자"}</div>
                            <div className="PostDetail_time">{time || "몇 분전"}</div>
                        </div>
                    </div>
                    <div className="PostDetail_postTitle">{title || "제목"}</div>
                    <div className="PostDetail_content">{content || "내용"}</div>
                    {/* 좋아요 및 북마크 버튼 */}
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
                {/* 댓글 출력 영역 */}
                <div className="PostDetail_commentbox">
                    {comments.map(comment => (
                        <div className="PostDetail_comment" key={comment.commentId}>
                            <div className="PostDetail_writer">
                                <div className="PostDetail_commproImage">
                                    <img src={myImage} alt="프로필" />
                                </div>
                                <div className="PostDetail_commwriter">{comment.memberId}</div>
                            </div>
                            <div className="PostDetail_content PostDetail_comm_cont">{comment.content}</div>
                            <div className="PostDetail_time">{comment.createdAt}</div>

                {/* 대댓글 출력 영역 */}
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
                    <button onClick={(e) => handleReplySubmit(e, comment.commentId)}>작성</button>
                </div>
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
                    <button className="PostDetail_button" onClick={handleCommentSubmit}>작성</button>
                </div>
                {/* 게시판 목록 버튼 */}
                <div className="PostDetail_postlistbtn" onClick={() => navigate("/Certificate")}>글 목록</div>
            </div>
        </>
    );
};

export default PostDetail;
