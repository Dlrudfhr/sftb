import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/PostPage/Certificate.css";
import { FaRegHeart } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";

// 게시물 타입 정의
interface Post {
  postId: number;
  title: string;
  userName: string;
  content: string;
  createAt: string;
  updateAt: string;
  userId: string;
  filePath: string;
  viewCount: number;
  heart: number;
}

const Certificate = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchKey, setSearchKey] = useState("제목"); // 검색 기준 상태
  const [displayedTitle, setDisplayedTitle] = useState<string>(""); // 타이핑 애니메이션용 상태
  const typingSpeed: number = 170; // 타이핑 속도
  const text = "자 격증 정보 게시판"; // 타이핑할 텍스트
  const navigate = useNavigate();

  // 타이핑 효과 처리
  useEffect(() => {
    let index = 0;
    const type = () => {
      if (index < text.length) {
        setDisplayedTitle((prev) => prev + text.charAt(index)); // 한 글자씩 추가
        index++;
        setTimeout(type, typingSpeed); // 일정 시간마다 타이핑
      }
    };
    type(); // 타이핑 시작

    // Cleanup 함수로 메모리 누수 방지
    return () => {
      index = text.length; // 타이핑 완료 후 인덱스 종료
    };
  }, [text]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Board_ID가 2인 게시물만 가져오기
        const response = await axios.get("http://localhost:8080/api/posts", {
          params: { boardId: 2 },
        });
        setPosts(response.data); // 게시물 데이터 상태에 저장
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // 글자수 제한
  const Post: React.FC<{ content: string }> = ({ content }) => {
    const truncatedContent =
      content.length > 33 ? content.substring(0, 33) + "..." : content;
    return <p>{truncatedContent}</p>;
  };

  // 게시글 제목 글자수 제한 컴포넌트
  const PostTitle: React.FC<{ content: string }> = ({ content }) => {
    const truncatedContent =
      content.length > 11 ? content.substring(0, 11) + "..." : content;
    return <p>{truncatedContent}</p>;
  };

  // 검색어와 게시글 비교할 때 띄워쓰기 제거
  const removeSpaces = (str: string) => {
    return str.replace(/\s+/g, "");
  };

  const filteredPosts = posts.filter((post) => {
    const lowerCaseSearchTerm = removeSpaces(searchTerm.toLowerCase());
    const lowerCaseTitle = removeSpaces(post.title.toLowerCase());
    const lowerCaseContent = removeSpaces(post.content.toLowerCase());
    const lowerCaseUserName = removeSpaces(post.userName.toLowerCase());
    if (searchKey === "제목") {
      return lowerCaseTitle.includes(lowerCaseSearchTerm);
    } else if (searchKey === "내용") {
      return lowerCaseContent.includes(lowerCaseSearchTerm);
    } else if (searchKey === "등록자명") {
      return lowerCaseUserName.includes(lowerCaseSearchTerm);
    }
    return true;
  });

  return (
    <>
      <Header />

      <div className="post_layout">
        {/* 타이핑 애니메이션 제목 */}
        <h1 className="Main_box_visual_QnA">{displayedTitle}</h1>

        {/* 위로 이동 버튼 */}
        <div className="Certificate_high">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            top
          </button>
        </div>

        {/* 검색창 */}
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
              총 게시물 <strong>{filteredPosts.length}</strong>
            </span>
          </div>

          {/* 게시글 작성 페이지로 이동 */}
          <div className="Coding_write">
            <Link to="/PostWrite" state={{ boardId: 2 }}>
              <button type="submit" className="Coding_toWrite">
                작성하기
              </button>
            </Link>
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
                    onClick={() =>
                      navigate(`/PostDetail/${post.postId}`, {
                        state: {
                          postId: post.postId,
                          title: post.title,
                          content: post.content,
                          userName: post.userName,
                          time: post.createAt,
                          newTime: post.updateAt,
                          userId: post.userId,
                          fileName: post.filePath,
                          boardId: 2,
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

export default Certificate;
