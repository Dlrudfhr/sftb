import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Header";
import "../../assets/css/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import { FaRegHeart, FaRegBookmark, FaHeart, FaBookmark } from "react-icons/fa";
import axios from "axios";

interface Comment {
    commentId: number;
    content: string;
    memberId: string;
    createdAt: string;
    replies?: Comment[];
}

interface PostDetails {
    title: string;
    content: string;
    writer: string;
    createdAt: string;
    heartCount: number;
    bookmarkCount: number;
}

const PostDetail: React.FC = () => {
    const { postId } = useParams<{ postId: string }>();
    const [heart, setHeart] = useState(false);
    const [bookmark, setBookmark] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentInput, setCommentInput] = useState("");
    const [replyInput, setReplyInput] = useState<{ [key: number]: string }>({});
    const [postDetails, setPostDetails] = useState<PostDetails | null>(null);

    const handleHeart = () => {
        setHeart(!heart);
    }

    const handleBookmark = () => {
        setBookmark(!bookmark);
    }

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comments/${postId}`);
            setComments(response.data);
        } catch (error) {
            console.error("댓글 가져오기 실패:", error);
        }
    };

    const fetchPostDetails = async () => {
        try {
            const response = await axios.get(`/api/posts/${postId}`);
            setPostDetails(response.data);
        } catch (error) {
            console.error("게시글 가져오기 실패:", error);
        }
    };

    // 매개변수 타입을 MouseEvent로 변경
    const handleCommentSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (!commentInput) return;
        const userName = localStorage.getItem("userName"); // 로컬 스토리지에서 userName 가져오기
        console.log("Post ID:", postId); // postId 로그 확인
        try {
            await axios.post('/api/comments', { 
                postId : postId, 
                content: commentInput,
                memberId: userName
            });
            setCommentInput("");
            fetchComments();
        } catch (error) {
            console.error("댓글 추가 실패:", error);
        }
    };

    const handleReplySubmit = async (e: React.MouseEvent<HTMLButtonElement>, parentId: number) => {
        e.preventDefault();
        if (!replyInput[parentId]) return;
        try {
            await axios.post('/api/comments', { 
                postId, 
                parentId, 
                content: replyInput[parentId] });
            setReplyInput({ ...replyInput, [parentId]: "" });
            fetchComments();
        } catch (error) {
            console.error("대댓글 추가 실패:", error);
        }
    };

    useEffect(() => {
        fetchPostDetails();
        fetchComments();
    }, [postId]);

    return (
        <>
            <Header />
            <div className="PostDetail_layout">
                <h3 className="postpage_title" onClick={() => (window.location.href = "/Certificate")}>자격증게시판</h3>
                <div className="PostDetail_box">
                    <div className="PostDetail_profile">
                        <div className="PostDetail_proImage"></div>
                        <div>
                            <div className="PostDetail_writer">{postDetails?.writer}</div>
                            <div className="PostDetail_time">{postDetails?.createdAt}</div>
                        </div>
                    </div>
                    <div className="PostDetail_postTitle">{postDetails?.title}</div>
                    <div className="PostDetail_content">{postDetails?.content}</div>
                    <div className="PostDetail_total">
                        <div className="PostDetail_totallike">좋아요 수: {postDetails?.heartCount}</div>
                        <div className="PostDetail_totalcomm">댓글 수: {comments.length}</div>
                        <div className="PostDetail_totalscrap">스크랩 수: {postDetails?.bookmarkCount}</div>
                    </div>
                    <div>
                        <button className="PostDetail_likebutton" onClick={handleHeart}>{heart ? (<FaHeart />) : (<FaRegHeart />)}</button>
                        <button className="PostDetail_scrapbutton" onClick={handleBookmark}>{bookmark ? (<FaBookmark />) : (<FaRegBookmark />)}</button>
                    </div>
                </div>

                <div className="PostDetail_commWritebox">
                    <input
                        className="PostDetail_commWrite"
                        placeholder="댓글을 입력하세요."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                    />
                    <button className="PostDetail_button" onClick={handleCommentSubmit}>작성</button>
                </div>

                <div className="PostDetail_commentbox">
                    {comments.map(comment => (
                        <div className="PostDetail_comment" key={comment.commentId}>
                            <div className="PostDetail_writer">
                                <div className="PostDetail_commproImage"><img src={myImage} /></div>
                                <div className="PostDetail_commwriter">{comment.memberId}</div>
                            </div>
                            <div className="PostDetail_content PostDetail_comm_cont">{comment.content}</div>
                            <div className="PostDetail_time">{comment.createdAt}</div>

                            {comment.replies && comment.replies.length > 0 && (
                                <div className="PostDetail_replies">
                                    {comment.replies.map(reply => (
                                        <div className="PostDetail_rerecomm" key={reply.commentId}>
                                            <div className="PostDetail_writer">
                                                <div className="PostDetail_commproImage"><img src={myImage} /></div>
                                                <div className="PostDetail_commwriter">{reply.memberId}</div>
                                            </div>
                                            <div className="PostDetail_content PostDetail_comm_cont">{reply.content}</div>
                                            <div className="PostDetail_time">{reply.createdAt}</div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <div className="PostDetail_rerecomm">
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

                <div className="PostDetail_postlistbtn" onClick={() => (window.location.href = "/Certificate")}>글 목록</div>
            </div>
        </>
    );
};

export default PostDetail;
