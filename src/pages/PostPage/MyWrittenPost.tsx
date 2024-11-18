import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/Coding.css";
import { IoEyeSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
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
  boardId: number;
}

const MyWrittenPosts = () => {
  const highElement = useRef<null | HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [myWrittenPosts, setMyWrittenPosts] = useState<Post[]>([]); // 작성한 글 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchKey, setSearchKey] = useState("제목"); // 검색 기준 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  // 작성한 글 가져오기
  useEffect(() => {
    const fetchMyWrittenPosts = async () => {
      const userId = localStorage.getItem("memberId");
      try {
        const response = await axios.get(`http://localhost:8080/api/posts/myposts`, {
          params: { userId: userId }, // 사용자 ID를 파라미터로 전달
        });

        const myWrittenPosts = response.data; // 사용자가 작성한 글 데이터
        setMyWrittenPosts(myWrittenPosts);
      } catch (error) {
        console.error("Error fetching my posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyWrittenPosts(); // 작성한 글을 가져옴
  }, []);

  // 글자수 제한 컴포넌트
  const Post: React.FC<{ content: string }> = ({ content }) => {
    const truncatedContent = content.length > 33 ? content.substring(0, 33) + "..." : content;
    return <p>{truncatedContent}</p>;
  };

  const PostTitle: React.FC<{ content: string }> = ({ content }) => {
    const truncatedContent = content.length > 11 ? content.substring(0, 11) + "..." : content;
    return <p>{truncatedContent}</p>;
  };

  // 검색 기능
  const filteredPosts = myWrittenPosts.filter((post) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const lowerCaseTitle = post.title.toLowerCase();
    const lowerCaseContent = post.content.toLowerCase();
    const lowerCaseUserName = post.userName.toLowerCase();

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
        <h1 className="post_title">내가 작성한 글</h1>

        {/* 위로이동 버튼 */}
        <div className="Certificate_high">
          <button type="button" onClick={() => onMoveBox(highElement)}>
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

        {/* 작성한 글 게시물 수 */}
        <div className="Certificate_Number">
          <div className="Certificate_postNumber">
            <span>총 작성한 글 {filteredPosts.length}</span>
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
                      let path = '';
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
                      <div className="Certificate_card_icons">
                        <div className="Certificate_writer">{post.userName}</div>
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

export default MyWrittenPosts;