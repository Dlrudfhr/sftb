import React, { useEffect, useState, useRef } from "react"; 
import { Link } from "react-router-dom";
import Header from "../Header"; 
import Footer from "../Footer"; 
import "../../assets/css/Certificate.css"; 
import { FaRegStar } from "react-icons/fa";
import axios from "axios"; 

// 게시물 타입 정의
interface Post {
  creSeq: number; // 게시물 ID
  title: string; // 제목
  userName: string; // 사용자명
  content: string; // 내용
}

const Certificate = () => {
  const highElement = useRef<null | HTMLDivElement>(null);
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

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

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <Header />

      <div className="Certificate_layout">
        <h4 className="postpage_title" onClick={() => (window.location.href = "/Certificate")}>자격증 게시판</h4>

        <div className="Certificate_high">
          <button type="button" onClick={() => onMoveBox(highElement)}>
            top
          </button>
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

        <div className="Certificate_Number">
          <div className="Certificate_postNumber">
            <span>총 게시물 <strong>{posts.length}</strong></span>
            <span>현재 페이지 <strong>1/1627</strong></span>
          </div>

          <div className="Certificate_write">
            <Link to="/PostWrite">
              <button type="submit" className="Certificate_toWrite">작성하기</button>
            </Link>
          </div>
        </div>

        <div className="Certificate_postline">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ul className="Certificate_postline1">
              {posts.map((post) => (
                <li key={post.creSeq}>
                  <div className="Certificate_card" onClick={() => (window.location.href = "/PostDetail")}>
                    <div className="Certificate_card_innerbox">
                      <div className="Certificate_card_title">{post.title}</div>
                      <div className="Certificate_card_info">{post.content}</div>
                      <div className="Certificate_card_userName">{post.userName}</div>
                      <div className="Certificate_card_icons"><FaRegStar /></div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/*게시판 페이지네이션 */}
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
