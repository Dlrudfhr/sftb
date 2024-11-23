import React, { useEffect, useState, useRef } from "react"; /* 바로가기 참조 */
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "../Header"; /* Header 참조 */
import Footer from "../Footer"; /* footer 참조 */
import "../../assets/css/Coding.css";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios";
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
  boardId : number;
}


const MyBookmark = () => {
  const highElement = useRef<null | HTMLDivElement>(null); // 상단으로 돌아가기 버튼
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Post[]>([]); //북마크 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchKey, setSearchKey] = useState("제목"); // 검색 기준 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    window.scrollTo({ behavior: "smooth", top:0 });
  };

  // 백엔드에서 북마크된 postId가져오기
  useEffect(() => {
    const fetchBookmarks = async () => {
      const userId = localStorage.getItem("memberId");
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/user/bookmarks`, {
          params: { userId: userId }, // 쿼리 파라미터로 userId 전달
        });

        const bookmarkedPostIds : number[] = response.data;

        // 1. 북마크된 게시글 ID로 게시글 데이터 가져오기
        const postsPromises = bookmarkedPostIds.map(async (postId : number) => {
          const postResponse = await axios.get(`http://localhost:8080/api/posts/${postId}`);
          console.log(postResponse.data);
          return postResponse.data;
        });

        const posts = await Promise.all(postsPromises); // 모든 게시글 정보를 가져옴
        setBookmarkedPosts(posts);
      } catch (error) {
        console.error("Error fetching bookmarks or posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookmarks();
  }, []);
  

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

  const filteredPosts = bookmarkedPosts.filter((post) => {
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
        <h1 className="post_title">북마크 한 글</h1>

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
              총 게시물 {filteredPosts.length}{" "}
              {/* 필터링된 게시물 수 */}
            </span>
          </div>
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
                    onClick={() => {
                      let path = ''; // 경로를 저장할 변수
                      if (post.boardId === 5 || post.boardId === 6) {
                        path = `/PostAdopt/${post.postId}`;
                      } else if (post.boardId === 10) {
                        path = `/PostAnnouncement/${post.postId}`;
                      } else {
                        path = `/PostDetail/${post.postId}`;
                      }
                      navigate(path, {
                        state: {
                          postId: post.postId,
                          title: post.title,
                          content: post.content,
                          userName: post.userName,
                          time: post.createAt,
                          newTime: post.updateAt,
                          userId: post.userId,
                          fileName: post.filePath,
                          boardId: post.boardId,
                        },
                      });
                    }}
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
                        <div></div>
                        <div className="Certificate_viewCount"><IoEyeSharp /> {post.viewCount}</div>
                        <div className="Certificate_heart"><FaRegHeart /> {post.heart}</div>                       
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
export default MyBookmark;
