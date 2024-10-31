import React, {useEffect, useState, useRef } from "react"; /* 바로가기 참조 */
import { Routes, Route, Link } from "react-router-dom";
import Header from "../Header"; /* Header 참조 */
import Footer from "../Footer"; /* footer 참조 */
import "../../assets/css/PostPage/Coding.css"; /* 스타일 참조 */
import { FaRegStar, FaSearch, FaRegBookmark ,FaBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios"; 

// 게시물 타입 정의
interface Post {
  creSeq: number; // 게시물 ID
  title: string; // 제목
  userName: string; // 사용자명
  content: string; // 내용
}

const Market = () => {
  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 백엔드에서 게시물 데이터 가져오기
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/posts",{
          params: { boardId: 8 } // 여기서 Board_ID를 쿼리 파라미터로 전달
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

  {/*글자수 제한 */}
  interface PostProps {
    content: string;
    
  }
  
  {/*게시글 내용 글자수 제한 컴포넌트 */}
  const Posttext: React.FC<PostProps> = ({ content }) => {
    const truncatedContent = content.length > 33 ? content.substring(0, 33) + "..." : content;

    return <p>{truncatedContent}</p>;
  };

  {/*게시글 제목 글자수 제한 컴포넌트 */}
  const PostTitle: React.FC<PostProps> = ({ content }) => {
    const truncatedContent = content.length > 11 ? content.substring(0, 11) + "..." : content;

    return <p>{truncatedContent}</p>;
  };

  return(
    <>
    <Header />
    <div className="post_layout">
        <h1 className="post_title">전공책 장터게시판</h1>

        {/*검색창 */}
        <div className="Coding_Search">
          <div className="Coding_Search_form">
            <div className="Coding_filter">
              <select className="Coding_search_key">
                <option>--검색선택--</option>
                <option>제목</option>
                <option>내용</option>
                <option>등록자명</option>
              </select>
            </div>
            
            <div className="Certificate_input">
              <input className="Certificate_search_txt" type="text" placeholder="검색어를 입력하세요." />
            </div>
            
            
          </div>
        </div>

        {/*게시판 게시글 갯수  */}
        <div className="Coding_Number">
          <div className="Coding_postNumber">
            <span>총 게시물 <strong>{posts.length}</strong></span>
          </div>

          {/*게시글 작성 페이지로 이동 */}
          <div className="Coding_write">
            <Link to="/PostWrite" >
              <button type="submit" className="Coding_toWrite">작성하기</button>
            </Link>
          </div>
        </div>
      
        <div className="Coding_postline">
          {loading ? (<div>Loading...</div>) : (
            
            <ul className="Coding_postline1">
              {posts.map((post) => (
              <li key={post.creSeq}>

                
                <div className="Coding_card"
                    onClick={() => (window.location.href = "/PostDetail")}>
                    <div className="Coding_card_innerbox">
                      <div className="Coding_card_title"><PostTitle content={post.title}/></div>
                      <div className="Coding_card_info"><Posttext content={post.content}/></div>
                      
                      {/*작성자, 조회수, 좋아요수, 스크랩여부 */}
                      <div className="Coding_card_icons">
                        <div className="Coding_writer">{post.userName}</div>
                        <div className="Coding_icons_right">
                          <div className="Coding_clicknum">조회수</div>
                          <div className="Coding_heart"><FaRegHeart /></div>
                          <div className="Coding_scrap"><FaRegBookmark /></div>
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
    </>


  );
};
export default Market;