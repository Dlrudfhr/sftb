import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Header from "../Header";
import CommentAdoptModal from "./Comment_Adopt_Modal"; // 모달 컴포넌트 import
import "../../assets/css/PostPage/PostDetail.css";
import myImage from "../../assets/images/manggu.jpg";
import {
  FaRegComment,
  FaRegHeart,
  FaRegBookmark,
  FaHeart,
  FaBookmark,
} from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import { FiMoreHorizontal } from "react-icons/fi";

interface Comment {
  commentId: number;
  content: string;
  memberId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  adopt: boolean; // 채택 여부를 나타내는 속성
  replies?: Comment[];
}

const PostDetail: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { title, content, userName, time } = state || {};
  const { postId } = useParams<{ postId: string }>();
  const [hasAdoptedComment, setHasAdoptedComment] = useState(false); // 상태 추가
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setReplyInput] = useState<{ [key: number]: string }>({});
  const commentElement = useRef<null | HTMLInputElement>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [comDropdown, setcomDropdown] = useState(false);
//
  const handleMoreClick = () => {
    setShowDropdown(!showDropdown);
}

const handleFNDClick = () => {
    setcomDropdown(!comDropdown);
}


  // 모달 상태 및 채택할 댓글 ID 상태 추가
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentToAdopt, setCommentToAdopt] = useState<number | null>(null);
  
  // 모달 열기
  const openModal = (commentId: number) => {
    setCommentToAdopt(commentId);
    setIsModalOpen(true);
  };

  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setCommentToAdopt(null);
  };

  // 채택 확인
  const confirmAdopt = async () => {
    if (commentToAdopt !== null) {
      const isReply = comments.flatMap(comment => comment.replies || []).some(reply => reply.commentId === commentToAdopt);
      await handleAdoptComment(commentToAdopt, isReply); // isReply 값을 전달
      closeModal(); // 모달 닫기
    }
  };

  // 시간을 포맷하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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

  // 현재 시간을 한국 시간대로 변환
  const updatedTime = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

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

    {/*댓글 하트 클릭 이벤트 */}
    const [comheart, setcomHeart] = useState(false);
    const handlecomHeart = () => {
          setcomHeart(!comheart);
    }
  

  // 게시물 삭제 함수
  const handleDelete = async () => {
    try {
      const confirmDelete = window.confirm(
        "정말로 이 게시물을 삭제하시겠습니까?"
      );
      if (!confirmDelete) return; // 사용자가 삭제를 취소하면 함수 종료

      // 토큰 확인
      const token = localStorage.getItem("token");
      console.log("현재 토큰:", token);

      // 게시물 삭제 요청
      const response = await axios.delete(
        `http://localhost:8080/api/posts/${state.postId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // 필요한 경우 Authorization 헤더 추가
          },
        }
      );

      if (response.status === 200) {
        alert("게시물이 삭제되었습니다.");
        navigate("/Certificate"); // 삭제 후 목록으로 이동
      } else {
        alert("게시물 삭제에 실패했습니다.");
      }
    } catch (error) {
      console.error("게시물 삭제 중 오류 발생:", error);
      alert("게시물 삭제에 실패했습니다.");
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
      const response = await axios.get<Comment[]>(`/api/comments/${postId}`);
  
      // 댓글 데이터에서 Adopt 값을 초기화
      const commentsWithAdoptedStatus = response.data.map((comment) => ({
        ...comment,
        adopt: comment.adopt || false, // 기본값 설정
      }));
  
      setComments(commentsWithAdoptedStatus);
    // 채택된 댓글이나 대댓글이 있는지 확인
    const adoptedExists = commentsWithAdoptedStatus.some(comment => comment.adopt) || 
                          commentsWithAdoptedStatus.some(comment => comment.replies?.some(reply => reply.adopt));
    setHasAdoptedComment(adoptedExists);
    } catch (error) {
      console.error("댓글 가져오기 실패:", error);
    }
  };

  // 댓글 추가 함수
  const handleCommentSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!commentInput) return;
    const userName = localStorage.getItem("userName"); // 로컬 스토리지에서 userName 가져오기
    const userId = getCurrentUserId(); // 사용자 ID 가져오기
    const userLevelExperience = 10; // 부여할 레벨 경험치 값
    console.log("Comment Input:", commentInput);
    console.log("Post ID:", postId);
    console.log("User Name:", userName);
    console.log("UserID:", userId);
    try {
      const commentResponse = await axios.post("/api/comments", {
        postId: postId,
        content: commentInput,
        userId: userId,
        memberId: userName,
      });
      if (commentResponse.status === 200) {
        await axios.put(`/api/auth/experience`, {
          userId: userId,
          userLevelExperience,
        });
        setCommentInput("");
        fetchComments();
      }
    } catch (error) {
      console.error("댓글 추가 실패:", error);
    }
  };

  // 대댓글 추가 함수
  const handleReplySubmit = async (
    e: React.MouseEvent<HTMLButtonElement>,
    parentId: number
  ) => {
    e.preventDefault();
    if (!replyInput[parentId]) return;

    const userName = localStorage.getItem("userName"); // 사용자 이름 가져오기
    const userId = getCurrentUserId(); // 사용자 ID 가져오기
    const userLevelExperience = 10; // 부여할 레벨 경험치 값
    if (!userName) {
      console.error("User Name is null");
      return; // 사용자 이름이 없으면 함수 종료
    }
    try {
      const replyResponse = await axios.post("/api/comments", {
        postId,
        parentId,
        content: replyInput[parentId],
        userId: userId, // 실제 사용자 ID 전송
        memberId: userName, // memberId에 사용자 이름 추가
      });
      // 대댓글 추가가 성공한 경우에만 경험치 추가 요청
      if (replyResponse.status === 200) {
      await axios.put(`/api/auth/experience`, {
        userId: userId,
        userLevelExperience,
      });
      setReplyInput({ ...replyInput, [parentId]: "" });
      fetchComments();
    }
    } catch (error) {
      console.error("대댓글 추가 실패:", error);
    }
  };

  // 대댓글 토글 함수
  const [isReplyVisible, setIsReplyVisible] = useState<{
    [key: number]: boolean;
  }>({});
  const toggleReplyVisibility = (commentId: number) => {
    setIsReplyVisible((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
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
        time: updatedTime, // 수정된 시간을 현재 시간으로 설정
        postId, // 게시물 ID 추가
      },
    });
  };

  // 댓글 수정하는 함수
  const handleEditComment = async (commentId: number) => {
    const newContent = prompt("수정할 댓글 내용을 입력하세요:");
    if (newContent) {
      try {
        // 댓글 수정 API 호출
        const response = await axios.put(
          `/api/comments/${commentId}`,
          { content: newContent },
          { headers: { "Content-Type": "application/json" } } // 헤더 추가
        );

        // 수정된 댓글 객체를 가져오기
        const updatedComment = response.data; // 서버에서 수정된 댓글 객체를 받아오는 경우
        console.log(updatedComment);
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? {
                  ...comment,
                  content: newContent,
                  createdAt: updatedComment.createdAt,
                  updatedAt: updatedComment.updatedAt,
                } // 수정된 시간으로 업데이트
              : comment
          )
        );
        fetchComments(); // 댓글 목록 갱신
      } catch (error) {
        console.error("댓글 수정 실패:", error);
      }
    }
  };

  // 댓글 삭제하는 함수
  const handleDeleteComment = async (commentId: number) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    const userId = getCurrentUserId(); // 사용자 ID 가져오기
    const userLevelExperience = -10; // 부여할 레벨 경험치 값
    if (confirmDelete) {
      try {
        const deleteResponse = await axios.delete(
          `/api/comments/${commentId}`,
          { headers: { "Content-Type": "application/json" } } // 헤더 추가
        );
        // 댓글 삭제가 성공한 경우에만 경험치 차감 요청
        if (deleteResponse.status === 200) {
          await axios.put(`/api/auth/experience`, {
            userId: userId,
            userLevelExperience,
          });
          fetchComments(); // 댓글 목록 갱신
        }
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
      }
    }
  };

  // 대댓글 수정하는 함수
  const handleEditReply = async (replyId: number) => {
    const newContent = prompt("수정할 대댓글 내용을 입력하세요:");
    if (newContent) {
      try {
        const response = await axios.put(
          `/api/comments/replies/${replyId}`,
          { content: newContent },
          { headers: { "Content-Type": "application/json" } }
        );

        const updatedReply = response.data; // 수정된 대댓글을 받아옴
        setComments((prevComments) =>
          prevComments.map((comment) => ({
            ...comment,
            replies: comment.replies
              ? comment.replies.map((reply) =>
                  reply.commentId === replyId
                    ? {
                        ...reply,
                        content: updatedReply.content,
                        createdAt: updatedReply.createdAt,
                        updatedAt: updatedReply.updatedAt, // 수정된 시간 반영
                      }
                    : reply
                )
              : [], // replies가 없을 경우 빈 배열로 대체
          }))
        );

        fetchComments(); // 댓글 목록 갱신
      } catch (error) {
        console.error("대댓글 수정 실패:", error);
      }
    }
  };

  // 대댓글 삭제하는 함수
  const handleDeleteReply = async (replyId: number) => {
    const confirmDelete = window.confirm("정말로 삭제하시겠습니까?");
    const userId = getCurrentUserId(); // 사용자 ID 가져오기
    const userLevelExperience = -10; // 부여할 티어 경험치 값
    if (confirmDelete) {
      try {
        const deleteResponse = await axios.delete(
          `/api/comments/replies/${replyId}`,
          { headers: { "Content-Type": "application/json" } } // 헤더 추가
        );
        // 대댓글 삭제가 성공한 경우에만 경험치 차감 요청
      if (deleteResponse.status === 200) {
        await axios.put(`/api/auth/experience`, {
          userId: userId,
          userLevelExperience,
        });
        fetchComments(); // 댓글 목록 갱신
      }
      } catch (error) {
        console.error("대댓글 삭제 실패:", error);
      }
    }
  };

  //댓글 채택 함수
  const handleAdoptComment = async (commentId: number, isReply: boolean = false) => {
    const adoptedComment = isReply
    ? comments.flatMap(comment => comment.replies || []).find(reply => reply.commentId === commentId) // replies가 undefined일 경우 빈 배열로 대체
      : comments.find(comment => comment.commentId === commentId);
    
    const tierExperience = 10; // 부여할 티어 경험치 값
    if (!adoptedComment) {
      alert("댓글을 찾을 수 없습니다.");
      return;
    }
  
    const commentAuthorId = adoptedComment.userId;
    try {
      const response = await axios.post(`/api/comments/${commentId}/adopt`, {
        userId: commentAuthorId,
        tierExperience,
        postId,
      });
  
      if (response.status === 200) {
        alert("댓글이 채택되었습니다!");
        const updatedComment = response.data;
        setComments(prevComments => 
          prevComments.map(comment => ({
            ...comment,
            replies: comment.replies
              ? comment.replies.map(reply => 
                  reply.commentId === updatedComment.commentId ? updatedComment : reply
                )
              : [],
          }))
        );
  
        fetchComments(); // 댓글 목록 갱신  
      } else {
        alert("댓글 채택에 실패했습니다.");
      }
    } catch (error) {
      console.error("댓글 채택 중 오류 발생:", error);
      alert("댓글 채택 중 오류가 발생했습니다.");
    }
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
              <div className="PostDetail_proImage">
                {/*<img src={catImage}/>*/}
              </div>
              <div className="PostDetail_middle">
                <div className="PostDetail_writer">{userName || "작성자"}</div>
                <div className="PostDetail_time">
                  {time ? formatDate(time) : "몇 분전"}

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
            </div>

            {/*게시글 제목&내용 */}
            <div className="PostDetail_postTitle">{title || "제목"}</div>
            <div className="PostDetail_content">{content || "내용"}</div>

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
            </div>
          </div>
        </div>

        {/* 채택된 댓글 출력 */}
        <div className="PostDetail_commentbox">
            {comments.filter(comment => comment.adopt).map((comment) => (
              <div className="PostDetail_comment" key={comment.commentId}>
                <div className="PostDetail_writer">
                  <div className="PostDetail_commproImage">
                    <img src={myImage} alt="프로필" />
                  </div>
                  <div className="PostDetail_commwriter">{comment.memberId}</div>
                </div>
                <div className="PostDetail_content PostDetail_comm_cont adopted">
                  채택된 댓글입니다 : {comment.content}
                </div>
                <div className="PostDetail_time">
                  {formatDate(comment.updatedAt || comment.createdAt)}
                </div>
                {/* 채택된 댓글에 대해 수정 및 삭제 버튼 추가 (필요시) */}
                {comment.userId === getCurrentUserId() && (
                  <>
                    <button onClick={() => handleEditComment(comment.commentId)}>
                      수정
                    </button>
                    <button onClick={() => handleDeleteComment(comment.commentId)}>
                      삭제
                    </button>
                  </>
                )}
              </div>
            ))}
             {/* 채택된 대댓글 출력 */}
            {comments.map(comment => 
              comment.replies?.filter(reply => reply.adopt).map(reply => (
                <div className="PostDetail_comment" key={reply.commentId}>
                  <div className="PostDetail_writer">
                    <div className="PostDetail_commproImage">
                      <img src={myImage} alt="프로필" />
                    </div>
                    <div className="PostDetail_commwriter">{reply.memberId}</div>
                  </div>
                  <div className="PostDetail_content PostDetail_comm_cont adopted">
                    채택된 대댓글입니다 : {reply.content}
                  </div>
                  <div className="PostDetail_time">
                    {formatDate(reply.updatedAt || reply.createdAt)}
                  </div>
                  {/* 대댓글에 대해 수정 및 삭제 버튼 추가 (필요시) */}
                  {reply.userId === getCurrentUserId() && (
                    <>
                      <button onClick={() => handleEditReply(reply.commentId)}>
                        수정
                      </button>
                      <button onClick={() => handleDeleteReply(reply.commentId)}>
                        삭제
                      </button>
                    </>
                  )}
                </div>
              ))
            )}
        </div>
          
        
        {/*댓글 출력 영역 */}
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
                        <div className="PostDetail_heart">
                            <FaRegHeart />
                        </div>
                        <div className="">
                        <div  onClick={handleFNDClick}><FiMoreHorizontal /></div>
                        {comment.userId === getCurrentUserId() && ( // 사용자 ID로 비교
                            <>
                        {comDropdown && (
                            <ul className="PostDetail_comdropdown">
                                {/* 수정하기 버튼 추가 */}
                                <li className="PostDetail_editButton"  onClick={() => handleEditComment(comment.commentId)}>
                                수정
                                </li>
                                <li onClick={() => handleDeleteComment(comment.commentId)}>삭제</li>
                            </ul>
                        )}
                            
                            
                            </>
                        )}
                        </div>
                    {/* 댓글 채택 버튼 조건, 여기서는 게시글 작성자와 로그인된 사용자의 이름을 비교하고있어서
                    게시글작성시 UserID넘어가게 완성되면 userName(이름)이아니라 UserID(아이디)로 비교하게 getCurrentUserId() === postAuthorId 이걸로 바꿔야함*/}
                    {userName === localStorage.getItem("userName") && !comment.adopt && comment.userId !== getCurrentUserId() && !hasAdoptedComment && (
                    <div className="PostDetail_adopt" onClick={() => openModal(comment.commentId)}>
                        <AiOutlineLike />
                    </div>
                    )}
                </div>

                <div className={`PostDetail_content PostDetail_comm_cont ${comment.adopt ? 'adopted' : ''}`}>
                    {comment.content}
                </div>
                
                <div className="PostDetail_time">
                    {formatDate(comment.updatedAt || comment.createdAt)}
                </div>
                
                {/*대댓글 출력 영역*/}
                {comment.replies &&
                    comment.replies.map((reply) => (
                    <div className="PostDetail_recomment" key={reply.commentId}>
                        <div className="PostDetail_writer">
                        <div className="PostDetail_commproImage">
                            {" "}
                            <img src={myImage} alt="프로필" />{" "}
                        </div>
                        <div className="PostDetail_commwriter">
                            {reply.memberId}
                        </div>
                        {/* 대댓글 채택 버튼 조건, 여기서는 게시글 작성자와 로그인된 사용자의 이름을 비교하고있어서
                        게시글작성시 UserID넘어가게 완성되면 userName(이름)이아니라 UserID(아이디)로 비교하게 getCurrentUserId() === postAuthorId 이걸로 바꿔야함 */}
                        {userName === localStorage.getItem("userName") && !reply.adopt && reply.userId !== getCurrentUserId() && !hasAdoptedComment && (
                            <div className="PostDetail_adopt" onClick={() => openModal(reply.commentId)}>
                            <AiOutlineLike />
                            </div>
                        )}
                        </div>
                        <div className={`PostDetail_content PostDetail_comm_cont ${reply.adopt ? 'adopted' : ''}`}>
                        {reply.content}
                        </div>
                        <div className="PostDetail_time">
                        {formatDate(reply.updatedAt || reply.createdAt)}
                        </div>
                        {reply.userId === getCurrentUserId() && ( // 사용자 ID로 비교
                        <>
                            <button
                            onClick={() => handleEditReply(reply.commentId)}
                            >
                            수정
                            </button>
                            <button
                            onClick={() => handleDeleteReply(reply.commentId)}
                            >
                            삭제
                            </button>
                        </>
                        )}
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
                        <div className="PostDetail_commwriter">
                            {localStorage.getItem("userName") || "작성자"}
                        </div>
                        </div>

                        <input
                        className="PostDetail_commWrite"
                        placeholder="대댓글을 입력하세요."
                        value={replyInput[comment.commentId] || ""}
                        onChange={(e) =>
                            setReplyInput({
                            ...replyInput,
                            [comment.commentId]: e.target.value,
                            })
                        }
                        />
                        <button
                        onClick={(e) => handleReplySubmit(e, comment.commentId)}
                        >
                        작성
                        </button>
                    </div>
                    </div>
                )}
                </div>
            ))}
        </div>
        
        {/* 모달 */}
        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>이 댓글을 채택하면 더이상 취소할 수 없습니다.</h2>
              <div className="modal-buttons">
                <button onClick={confirmAdopt}>예</button>
                <button onClick={closeModal}>아니오</button>
              </div>
            </div>
          </div>
        )}
    
        {/* 댓글 작성 영역 */}
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
