import React, { useEffect, useState, useRef } from "react"; /* 바로가기 참조 */
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Header from "../Header"; /* Header 참조 */
import Footer from "../Footer"; /* footer 참조 */
import "../../assets/css/Coding.css";
import { FaRegStar, FaSearch, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import axios from "axios";
import { CiCircleRemove } from "react-icons/ci";
import { IoEyeSharp } from "react-icons/io5";



const MyBookmark = () => {
  const highElement = useRef<null | HTMLDivElement>(null); // 상단으로 돌아가기 버튼
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태
  const [searchKey, setSearchKey] = useState("제목"); // 검색 기준 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    window.scrollTo({ behavior: "smooth", top:0 });
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
              총 게시물 <strong></strong>{" "}
              {/* 필터링된 게시물 수 */}
            </span>
          </div>

          {/*게시글 작성 페이지로 이동 */}
          <div className="Coding_write">
            <Link to="/PostWrite" state={{ boardId: 1 }}>
              <button type="submit" className="Coding_toWrite">
                작성하기
              </button>
            </Link>
          </div>
        </div>

        <div className="Certificate_postline">
            <ul className="Certificate_postline1">
                <li>
                      <div className="Certificate_card_innerbox">
                        <div className="Certificate_card_title"> 
                        </div>
                        <div className="Certificate_card_info">
                        </div>

                        {/* 작성자, 조회수, 좋아요수, 스크랩여부 */}
                        <div className="Certificate_card_icons">
                          <div className="Certificate_writer">
                          </div>
                          <div className="Certificate_icons_right">
                            {/* <div className="Certificate_viewCount"><IoEyeSharp /> </div> */}
                            {/* <div className="Certificate_heart"><FaRegHeart /> </div> */}
                          </div>
                        </div>
                      </div>
                    
                  </li>
                
            </ul>
          
        </div>
      </div>

      <Footer />
    </>
  );
};
export default MyBookmark;
