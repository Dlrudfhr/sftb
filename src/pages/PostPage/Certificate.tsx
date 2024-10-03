import React, { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom"; // Link 추가
import Header from "../Header";
import Footer from "../Footer";
import "../../assets/css/Certificate.css";
import { FaRegHeart, FaRegBookmark } from "react-icons/fa"; // 사용하지 않는 아이콘 제거
import axios from "axios";

// 게시물 타입 정의
interface Post {
  postId: number; // 게시물 ID
  title: string; // 제목
  userName: string; // 사용자명
  content: string; // 내용
  createAt: string; // 생성 시간 (ISO 8601 형식)
}

const Certificate = () => {
  const highElement = useRef<null | HTMLDivElement>(null); // 상단으로 돌아가기 버튼
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  // 백엔드에서 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts");
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
  interface PostProps {
    content: string;
  }

  // 게시글 내용 글자수 제한 컴포넌트
  const Post: React.FC<PostProps> = ({ content }) => {
    const truncatedContent = content.length > 33 ? content.substring(0, 33) + "..." : content;
    return <p>{truncatedContent}</p>;
  };

  // 게시글 제목 글자수 제한 컴포넌트
  const PostTitle: React.FC<PostProps> = ({ content }) => {
    const truncatedContent = content.length > 11 ? content.substring(0, 11) + "..." : content;
    return <p>{truncatedContent}</p>;
  };

  // 상단으로 이동하는 함수
  const onMoveBox = (element: React.RefObject<HTMLDivElement>) => {
    if (element.current) {
      element.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Header />
      <div className="Certificate_layout">
        <div className="Certificate_high">
          <button type="button" onClick={() => onMoveBox(highElement)}>top</button>
        </div>

        <div className="Certificate_Search">
          <div className="Certificate_Search_form">
            <div className="Certificate_filter">
              <select className="Certificate_search_key">
                <option>--검색선택--</option>
                <option>제목</option>
                <option>내용</option>
                <option>등록자명</option>
              </select>
            </div>
            <div className="Certificate_input">
              <input className="Certificate_search_txt" type="text" placeholder="검색어를 입력하세요." />
            </div>
            <div className="Certificate_button_list">
              <button className="Certificate_search_button" type="submit">검색</button>
              <button className="Certificate_search_button" type="button">초기화</button>
            </div>
          </div>
        </div>

        {/* 게시판 게시글 갯수와 페이지 수 */}
        <div className="Certificate_Number">
          <div className="Certificate_postNumber">
            <span>총 게시물 <strong>{posts.length}</strong></span>
          </div>

          {/* 게시글 작성 페이지로 이동 */}
          <div className="Certificate_write">
            <button type="submit" className="Certificate_toWrite" onClick={() => navigate("/PostWrite")}>
              작성하기
            </button>
          </div>
        </div>

        <div className="Certificate_postline">
          {loading ? (<div>Loading...</div>) : (
            <ul className="Certificate_postline1">
              {posts.map((post) => (
                <li key={post.postId}>
                  <div
                    className="Certificate_card"
                    onClick={() =>
                      navigate(`/PostDetail/${post.postId}`, {
                        state: {
                          title: post.title,
                          content: post.content,
                          userName: post.userName,
                          time: post.createAt, // 생성 시간을 상태로 전달 (표시는 하지 않음)
                          postId: post.postId, 
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
                        <div className="Certificate_writer">{post.userName}</div>
                        <div className="Certificate_icons_right">
                          <div className="">조회수</div>
                          <div className="Certificate_heart"><FaRegHeart /></div>
                          <div className="Certificate_scrap"><FaRegBookmark /></div>
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

      {/* 게시판 페이지네이션 */}
      <div className="Certificate_pages">
        <ul className="Certificate_pageNumber">
          <li><div className="Certificate_pagebtn"><Link to="#" style={{ textDecoration: "none" }} onClick={() => (window.location.href = "/Certificate")}>1</Link></div></li>
          <li><div className="Certificate_pagebtn"><Link to="#" style={{ textDecoration: "none" }} onClick={() => (window.location.href = "/Certificate")}>2</Link></div></li>
          <li><div className="Certificate_pagebtn"><Link to="#" style={{ textDecoration: "none" }} onClick={() => (window.location.href = "/Certificate")}>3</Link></div></li>
          <li><div className="Certificate_pagebtn"><Link to="#" style={{ textDecoration: "none" }} onClick={() => (window.location.href = "/Certificate")}>4</Link></div></li>
          <li><div className="Certificate_pagebtn"><Link to="#" style={{ textDecoration: "none" }} onClick={() => (window.location.href = "/Certificate")}>5</Link></div></li>
          <li><div className="Certificate_pagebtn"><Link to="#" style={{ textDecoration: "none" }} onClick={() => (window.location.href = "/Certificate")}>6</Link></div></li>
        </ul>
      </div>

      <Footer />
    </>
  );
};

export default Certificate;
