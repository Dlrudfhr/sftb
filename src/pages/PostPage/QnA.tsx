import React, { useEffect, useState, useRef } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/Coding.css";
import { FaRegHeart } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import axios from "axios";

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

const QnA = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("제목");
  const [displayedTitle, setDisplayedTitle] = useState<string>(""); // 타이핑 애니메이션용 상태
  const typingSpeed: number = 170; // 타이핑 속도
  const text = " 질문과 답 게시판"; // 타이핑할 텍스트
  const navigate = useNavigate();
  const indexRef = useRef<number>(0);

  // 타이핑 효과 처리
  useEffect(() => {
    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayedTitle((prev) => prev + text.charAt(indexRef.current)); // 한 글자씩 추가
        indexRef.current++;
        setTimeout(type, typingSpeed); // 일정 시간마다 타이핑
      }
    };
    setDisplayedTitle(""); // 초기화
    indexRef.current = -1;
    type(); // 타이핑 시작

    // Cleanup 함수로 메모리 누수 방지
    return () => {
      indexRef.current = text.length; // 타이핑 완료 후 인덱스 종료
    };
  }, [text]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts", {
          params: { boardId: 1 },
        });
        setPosts(response.data);
        setLoading(false);
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
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
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

        {/* 게시글 갯수와 작성 버튼 */}
        <div className="Certificate_Number">
          <div className="Certificate_postNumber">
            <span>
              총 게시물 <strong>{filteredPosts.length}</strong>
            </span>
          </div>
          <div className="Coding_write">
            <Link to="/PostWrite" state={{ boardId: 1 }}>
              <button type="submit" className="Coding_toWrite">
                작성하기
              </button>
            </Link>
          </div>
        </div>

        {/* 게시물 리스트 */}
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
                          boardId: 1,
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
                      <div className="Certificate_card_icons">
                        <div className="Certificate_writer">
                          {post.userName}
                        </div>
                        <div></div>
                        <div className="Certificate_viewCount">
                          <IoEyeSharp /> {post.viewCount}
                        </div>
                        <div className="Certificate_heart">
                          <FaRegHeart /> {post.heart}
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

export default QnA;
