import React, { useEffect, useState, useRef } from "react"; /* 바로가기 참조 */
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "../Header"; /* Header 참조 */
import Footer from "../Footer"; /* footer 참조 */
import "../../assets/css/PostPage/Coding.css"; /* 스타일 참조 */
import { FaRegStar, FaSearch, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";

// 게시물 타입 정의
interface Post {
  postId: number; // 게시물 ID
  title: string; // 제목
  userName: string; // 사용자명
  content: string; // 내용
  createAt: string; // 생성 시간 (ISO 8601 형식)
  updateAt: string;
  userId: string;
  filePath: string;
  viewCount : number;
  heart : number;
}

const Coding = () => {
  const highElement = useRef<null | HTMLDivElement>(null); // 상단으로 돌아가기 버튼
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchKey, setSearchKey] = useState("제목"); // 검색 기준 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // 백엔드에서 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Board_ID가 2인 게시물만 가져오기
        const response = await axios.get("http://localhost:8080/api/posts", {
          params: { boardId: 7 }, // 여기서 Board_ID를 쿼리 파라미터로 전달
        });
        setPosts(response.data); // 게시물 데이터 상태에 저장
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
    checkAdminStatus();
  }, []);

  // 관리자 여부 확인 함수
  const checkAdminStatus = async () => {
    try {
      const userID = localStorage.getItem("memberId"); // 로컬 스토리지에서 userID 가져오기
      if (userID) {
        const response = await axios.get(
          `http://localhost:8080/api/auth/users/${userID}/isAdmin`
        );
        setIsAdmin(response.data.isAdmin); // true면 관리자
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  // 글자수 제한
  interface PostProps {
    content: string;
  }

  // 게시글 내용 글자수 제한 컴포넌트
  const Post: React.FC<PostProps> = ({ content }) => {
    const truncatedContent =
      content.length > 33 ? content.substring(0, 33) + "..." : content;
    return <p>{truncatedContent}</p>;
  };

  // 게시글 제목 글자수 제한 컴포넌트
  const PostTitle: React.FC<PostProps> = ({ content }) => {
    const truncatedContent =
      content.length > 11 ? content.substring(0, 11) + "..." : content;
    return <p>{truncatedContent}</p>;
  };
  //검색어와 게시글 비교할때 띄워쓰기 제거
  const removeSpaces = (str: string) => {
    return str.replace(/\s+/g, ""); // 모든 공백 제거
  };

  const filteredPosts = posts.filter((post) => {
    const lowerCaseSearchTerm = removeSpaces(searchTerm.toLowerCase()); // 검색어에서 띄어쓰기 제거, 소문자로 변환
    const lowerCaseTitle = removeSpaces(post.title.toLowerCase()); // 게시물 제목에서 띄어쓰기 제거, 소문자로 변환
    const lowerCaseContent = removeSpaces(post.content.toLowerCase()); // 게시물 내용에서 띄어쓰기 제거, 소문자로 변환
    const lowerCaseUserName = removeSpaces(post.userName.toLowerCase()); // 작성자 이름에서 띄어쓰기 제거, 소문자로 변환
    if (searchKey === "제목") {
      return lowerCaseTitle.includes(lowerCaseSearchTerm);
    } else if (searchKey === "내용") {
      return lowerCaseContent.includes(lowerCaseSearchTerm);
    } else if (searchKey === "등록자명") {
      return lowerCaseUserName.includes(lowerCaseSearchTerm);
    }
    return true; // 기본적으로 모든 게시물을 반환
  });

  return (
    <>
      <Header />

      <div className="post_layout">
        <h1 className="post_title">코딩 문제 게시판</h1>

        {/* 위로이동 버튼 */}
        <div className="Certificate_high">
          <button type="button" onClick={() => onMoveBox(highElement)}>
            top
          </button>
        </div>

        {/*검색창 */}
        <div className="Certificate_Search">
          <div className="Certificate_Search_form">
            <div className="Certificate_filter">
              <select
                className="Certificate_search_key"
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}
              >
                <option>--검색선택--</option>
                <option>제목</option>
                <option>내용</option>
                <option>등록자명</option>
              </select>
            </div>
            <div className="Certificate_input">
              <input
                className="Certificate_search_txt"
                type="text"
                placeholder="검색어를 입력하세요."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* 게시판 게시글 갯수와 페이지 수 */}
        <div className="Certificate_Number">
          <div className="Certificate_postNumber">
            <span>
              총 게시물 <strong>{filteredPosts.length}</strong>{" "}
              {/* 필터링된 게시물 수 */}
            </span>
          </div>

          {/* 작성하기 버튼 - 관리자만 접근 가능 */}
          {isAdmin && (
            <div className="Coding_write">
              <Link to="/PostWrite" state={{ boardId: 7 }}>
                <button type="submit" className="Coding_toWrite">
                  작성하기
                </button>
              </Link>
            </div>
          )}
        </div>

        <div className="Certificate_postline">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="Certificate_postline1">
              {filteredPosts.map((post) => (
                <li key={post.postId}>
                  <div
                    className="Certificate_card"
                    onClick={() =>
                      navigate(`/PostDetail/${post.postId}`, {
                        state: {
                          postId: post.postId,
                          title: post.title,
                          content: post.content,
                          userName: post.userName,
                          time: post.createAt, // 생성 시간을 상태로 전달 (표시는 하지 않음)
                          newTime: post.updateAt,
                          userId: post.userId,
                          fileName :post.filePath,
                          boardId: 7,
                        },
                      })
                    }
                  >
                    <div className="Certificate_card_innerbox">
                      <div className="Certificate_card_title">
                        <PostTitle content={post.title} />
                      </div>
                      <div className="Certificate_card_info">
                        <Post content={post.content} />
                      </div>

                      {/* 작성자, 조회수, 좋아요수, 스크랩여부 */}
                      <div className="Certificate_card_icons">
                        <div className="Certificate_writer">
                          {post.userName}
                        </div>
                        <div className="Certificate_icons_right">
                          <div className="Certificate_viewCount"><IoEyeSharp /> {post.viewCount}</div>
                          <div className="Certificate_heart"><FaRegHeart /> {post.heart}</div>
                          {/* <div className="Certificate_scrap">
                            <FaRegBookmark />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Coding;
