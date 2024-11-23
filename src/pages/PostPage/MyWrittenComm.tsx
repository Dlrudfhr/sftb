import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/Coding.css";
import axios from "axios";
import { FaRegHeart } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
interface Comment {
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

const MyWrittenComm = () => {
  const highElement = useRef<null | HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [myWrittenComments, setMyWrittenComments] = useState<Comment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState("제목");
  const navigate = useNavigate();

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  useEffect(() => {
    const fetchMyWrittenComments = async () => {
      const userId = localStorage.getItem("memberId");
      try {
        const response = await axios.get(`http://localhost:8080/api/comments/mine`, {
          params: { userId: userId },
        });

        const myWrittenComments: number[] = response.data.map((comment: { postId: number }) => comment.postId);


        // 각 댓글에 대해 게시글 데이터 가져오기
        const commentsWithPosts = myWrittenComments.map(async (postId : number) => {
          const postResponse = await axios.get(`http://localhost:8080/api/posts/${postId}`);
          console.log(postResponse.data);
          return postResponse.data;
        });
        const posts = await Promise.all(commentsWithPosts);
        setMyWrittenComments(posts); // 댓글과 게시글 정보를 함께 저장
      } catch (error) {
        console.error("Error fetching my comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyWrittenComments();
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

  const filteredPosts = myWrittenComments.filter((post) => {
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
        <h1 className="post_title">내가 작성한 댓글</h1>

        {/* 위로이동 버튼*/}
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
                <option>내용</option>
                <option>게시글 제목</option>
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

export default MyWrittenComm;
