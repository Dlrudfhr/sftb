import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Header from "../Header";
import "../../assets/css/PostPage/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import { FaRegComment, FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
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
    const { state } = useLocation();
    const { title, content, userName, time } = state || {};
    const { postId } = useParams<{ postId: string }>();
    
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentInput, setCommentInput] = useState("");
    const [replyInput, setReplyInput] = useState<{ [key: number]: string }>({});
    const commentElement = useRef<null | HTMLInputElement>(null);

    // 시간을 포맷하는 함수
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    // 하트 상태 및 하트 수 상태 추가
    const [heart, setHeart] = useState(false);
    const [heartCount, setHeartCount] = useState(0);

    useEffect(() => {
        // 컴포넌트가 마운트될 때 하트 수를 가져옵니다.
        const fetchHeartCount = async () => {
            try {
                const response = await axios.get(`/api/posts/${postId}/hearts`); // 하트 수를 가져오는 API 호출
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
            await axios.post(`/api/posts/${postId}/hearts`, { heart: !heart }); // 하트 상태 업데이트 API 호출
            setHeartCount(newHeartCount); // 상태 업데이트
        } catch (error) {
            console.error("하트 수를 업데이트하는 데 실패했습니다.", error);
        }
    };

    // 북마크 상태
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

    // 댓글 추가 함수
    const handleCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!commentInput) return;
        const userName = localStorage.getItem("userName");
        try {
            await axios.post("/api/comments", { postId, content: commentInput, memberId: userName });
            setCommentInput("");
            fetchComments();
        } catch (error) {
            console.error("댓글 추가 실패:", error);
        }
    };

    // 대댓글 추가 함수
    const handleReplySubmit = async (e: React.MouseEvent<HTMLButtonElement>, parentId: number) => {
        e.preventDefault();
        if (!replyInput[parentId]) return;
        const userName = localStorage.getItem("userName");
        try {
            await axios.post("/api/comments", { postId, parentId, content: replyInput[parentId], memberId: userName });
            setReplyInput({ ...replyInput, [parentId]: "" });
            fetchComments();
        } catch (error) {
            console.error("대댓글 추가 실패:", error);
        }
    };

    // 대댓글 토글 함수
    const [isReplyVisible, setIsReplyVisible] = useState<{ [key: number]: boolean }>({});
    const toggleReplyVisibility = (commentId: number) => {
        setIsReplyVisible((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    return (
        <>
            <Header />
            <div className="PostDetail_layout">
                <h3 className="postpage_title" onClick={() => navigate("/Certificate")}>
                    <div className="PostDetail_titleinnerbox">자격증게시판</div>
                </h3>

                <div className="PostDetail_box">
                    <div className="PostDetail_innerbox">
                        <div className="PostDetail_profile">
                            <div className="PostDetail_proImage">
                                <img src={myImage} alt="프로필" />
                            </div>
                            <div className="">
                                <div className="PostDetail_writer">{userName || "작성자"}</div>
                                <div className="PostDetail_time">{time ? formatDate(time) : "몇 분 전"}</div>
                            </div>
                        </div>

                        <div className="PostDetail_postTitle">{title || "제목"}</div>
                        <div className="PostDetail_content">{content || "내용"}</div>

                        <div className="PostDetail_total">
                            <div className="PostDetail_totallike" onClick={handleHeart}>
                                {heart ? <FaHeart color="red" /> : <FaRegHeart />}
                                <span>{heartCount}</span> {/* 하트 수 표시 */}
                            </div>
                            <div className="PostDetail_totalcomm" onClick={() => commentElement.current?.scrollIntoView()}>
                                <FaRegComment />
                            </div>
                            <div className="PostDetail_totalscrap" onClick={handleBookmark}>
                                {bookmark ? <FaBookmark color="gold" /> : <FaRegBookmark />}
                            </div>
                        </div>
                    </div>

                    <div className="PostDetail_commentbox">
                        {comments.map((comment) => (
                            <div className="PostDetail_comment" key={comment.commentId}>
                                <div className="PostDetail_writer">
                                    <div className="PostDetail_commproImage">
                                        <img src={myImage} alt="프로필" />
                                    </div>
                                    <div className="PostDetail_commwriter">{comment.memberId}</div>
                                    <div className="PostDetail_viewwrite" onClick={() => toggleReplyVisibility(comment.commentId)}>
                                        <FaRegComment />
                                    </div>
                                </div>
                                <div className="PostDetail_content PostDetail_comm_cont">{comment.content}</div>
                                <div className="PostDetail_time">{formatDate(comment.createdAt)}</div>
                                {isReplyVisible[comment.commentId] && (
                                    <div className="reply">
                                        <input
                                            className="PostDetail_commWrite"
                                            placeholder="대댓글을 입력하세요."
                                            value={replyInput[comment.commentId] || ""}
                                            onChange={(e) =>
                                                setReplyInput({ ...replyInput, [comment.commentId]: e.target.value })
                                            }
                                        />
                                        <button onClick={(e) => handleReplySubmit(e, comment.commentId)}>작성</button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="PostDetail_commWritebox">
                        <input
                            className="PostDetail_commWrite"
                            placeholder="댓글을 입력하세요."
                            value={commentInput}
                            onChange={(e) => setCommentInput(e.target.value)}
                        />
                        <button className="PostDetail_button" onClick={handleCommentSubmit}>
                            <FaPaperPlane />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PostDetail;
