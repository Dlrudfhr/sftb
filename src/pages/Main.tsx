import { useState, useRef, useEffect } from "react"; //useRef 버튼 클릭 시 스크롤 이벤트
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "../assets/css/Main.css";
import React, { Children } from "react";
import axios from "axios";
import "../assets/css/Font.css";
import CongratulationsModal from "./CongratulatoryModal";
import { FaRegComment, FaComments } from "react-icons/fa";
import { PiCertificate } from "react-icons/pi";
import {
  FcConferenceCall,
  FcShop,
  FcCommandLine,
  FcWorkflow,
  FcCollaboration,
  FcDiploma1,
  FcDocument,
} from "react-icons/fc";
import logo from "../assets/images/SFTBlogo.png";

interface Post {
  postId: number; // 게시물 ID
  title: string; // 제목
  userName: string; // 사용자명
  content: string; // 내용
  createAt: string; // 생성 시간 (ISO 8601 형식)
  updateAt: string;
  userId: string;
  filePath: string;
  viewCount: number;
  heart: number;
}

function Main() {
  const firstElement = useRef<null | HTMLDivElement>(null); //스크롤 될 첫번째 위치요소
  const secondElement = useRef<null | HTMLDivElement>(null); //스크롤 될 두번째 위치요소
  const thirdElement = useRef<null | HTMLDivElement>(null); //스크롤 될 세번째 위치요소
  const fourthElement = useRef<null | HTMLDivElement>(null); //스크롤 될 네번째 위치요소
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();

  const [posts, setPosts] = useState<Post[]>([]); // 게시물 목록 상태
  const [loading, setLoading] = useState(true); // 로딩 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅

  const text: string = "Heello, World!\nAming for the top!";
  //\nWe're in\n the Department of\n Information & Communication
  const [displayedText, setDisplayedText] = useState<string>("");
  const typingSpeed: number = 50; // 타이핑 속도 (밀리초)
  const indexRef = useRef<number>(0);

  useEffect(() => {
    // let index: number = 0;

    const type = () => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current += 1;
        setTimeout(type, typingSpeed);
      }
    };
    setDisplayedText(""); // 초기화
    indexRef.current = 0;
    type();

    // Cleanup function to avoid memory leaks
    return () => {
      indexRef.current = text.length; // 타이핑이 끝나면 인덱스를 마지막으로 설정
    };
  }, [text]);

  useEffect(() => {
    // URL에서 쿼리 파라미터를 확인하여 모달 열기
    const params = new URLSearchParams(location.search);
    if (params.get("showModal") === "true") {
      setIsModalOpen(true);
    }
  }, [location]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // URL에서 쿼리 파라미터 제거
    const url = new URL(window.location.href);
    url.searchParams.delete("showModal");
    window.history.replaceState({}, "", url);
  };

  //버튼 클릭시 ref를 받아와 요소로 이동하는 스크롤 이벤트
  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const elementTop =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - 120, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Board_ID가 10인 게시물만 가져오기
        const response = await axios.get("http://localhost:8080/api/posts", {
          params: { boardId: 10 }, // 여기서 Board_ID를 쿼리 파라미터로 전달
        });
        console.log(response.data);
        setPosts(response.data); // 게시물 데이터 상태에 저장
        setLoading(false); // 로딩 완료
      } catch (error) {
        console.error("Error fetching posts:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <article className="Main_layout">
      {/*배너 전체 박스*/}
      <div className="Main_banner">
        <div className="Main_bannerBox">
          <div className="Main_box_visual">
            {displayedText.split("\n").map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          <div className="Main_box_visual2">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul>
                {posts.map((post) => (
                  <li key={post.postId}>
                    <div
                      className="Main_Info"
                      onClick={() =>
                        navigate(`/PostAnnouncement/${post.postId}`, {
                          state: {
                            postId: post.postId,
                            title: post.title,
                            content: post.content,
                            userName: post.userName,
                            time: post.createAt, // 생성 시간을 상태로 전달 (표시는 하지 않음)
                            newTime: post.updateAt,
                            userId: post.userId,
                            fileName: post.filePath,
                            boardId: 10,
                          },
                        })
                      }
                    >
                      {post.title}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {/*카테고리 이동 버튼 */}
        <div className="Main_box_tab">
          <ul>
            <li className="on">
              <button
                className="Main_button"
                title="소통 카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(firstElement)}
              >
                소통해요!
              </button>
            </li>
            <li className="">
              <button
                className="Main_button"
                title="공부 카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(secondElement)}
              >
                공부해요!
              </button>
            </li>
            <li className="">
              <button
                className="Main_button"
                title="else카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(thirdElement)}
              >
                장터
              </button>
            </li>
            <li className="">
              <button
                className="Main_button"
                title="else카테고리로 이동"
                type="button"
                onClick={() => onMoveBox(fourthElement)}
              >
                기록열람
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className="Main_categoryLayout">
        {/*소통 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_communication_card">
          <div className="Main_category_title" ref={firstElement}>
            함께 소통해요!
          </div>
          <ul className="Main__line">
            {/*질문과 답 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/QnA")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">질문과 답</div>
                  <div className="Main_card_info">자유롭게 질문하고 답하기</div>
                  <div className="Main_card_icons">
                    <FaRegComment />
                  </div>
                </div>
              </div>
            </li>
            {/*자격증 정보 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Certificate")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">자격증 정보</div>
                  <div className="Main_card_info">자격증 마스터</div>
                  <div className="Main_card_icons">
                    <FcDiploma1 />
                  </div>
                </div>
              </div>
            </li>
            {/*과목별 정보공유 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Share")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">과목별 정보공유</div>
                  <div className="Main_card_info">과목별 정보공유</div>
                  <div className="Main_card_icons">
                    <FcWorkflow />
                  </div>
                </div>
              </div>
            </li>
            {/*자유게시판 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/FreePost")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">자유게시판</div>
                  <div className="Main_card_info">자유게시판</div>
                  <div className="Main_card_icons">
                    <FaComments />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/*공부 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_study_card">
          <div className="Main_category_title" ref={secondElement}>
            공부해요!
          </div>
          <ul className="Main__line">
            {/*멘토멘티 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Mentor_mentee")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">멘토멘티</div>
                  <div className="Main_card_info">멘토멘티</div>
                  <div className="Main_card_icons">
                    <FcCollaboration />
                  </div>
                </div>
              </div>
            </li>
            {/*프로젝트 개발 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Project")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">프로젝트 개발</div>
                  <div className="Main_card_info">프로젝트 개발</div>
                  <div className="Main_card_icons">
                    <FcConferenceCall />
                  </div>
                </div>
              </div>
            </li>
            {/*코딩문제 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">코딩 문제</div>
                  <div className="Main_card_info">코딩 문제</div>
                  <div className="Main_card_icons">
                    <FcCommandLine />
                  </div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/*나머지 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_else_card">
          <div className="Main_category_title" ref={thirdElement}>
            장터
          </div>
          <ul className="Main__line">
            {/*전공책 장터 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Marketplace")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">전공책 장터</div>
                  <div className="Main_card_info">전공책 장터</div>
                  <div className="Main_card_icons">
                    <FcShop />
                  </div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        {/*나머지 카테고리 카드 */}
        <div className="Main_info_cate" id="Main_else_card">
          <div className="Main_category_title" ref={fourthElement}>
            기록열람
          </div>
          <ul className="Main__line">
            {/*장부기록 공개 게시판 카드 */}
            <li>
              <div
                className="Main_card"
                onClick={() => (window.location.href = "/Ledger")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title">장부 기록 공개</div>
                  <div className="Main_card_info">장부 기록 공개</div>
                  <div className="Main_card_icons">
                    <FcDocument />
                  </div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
            {/*비어있는 게시판 카드 */}
            <li>
              <div
                className="Main_card_hidden"
                onClick={() => (window.location.href = "/Coding")}
              >
                <div className="Main_card_content">
                  <div className="Main_card_title"></div>
                  <div className="Main_card_info"></div>
                  <div className="Main_card_icons"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/*스크롤 시 필요한 footer공간 */}
      <div className="Main_last_div">
        <div className="Main__lastInner">
          <div>Started From The Bottom</div>
          <div className="Main__2row">
            <img src={logo} className="Main__SFTBLogo"/>
            <div className="Main__Name">
              <div>이경록 2019143037</div>
              <div>이찬회 2019143040</div>
              <div>서수진 2021143023</div>
              <div>이정이 2020143043</div>
              <div>신성원 2020143032</div>
              <div>김태영 2020143010</div>
            </div>
          </div>
        </div>
      </div>

      {/* CongratulationsModal 추가 */}
      <CongratulationsModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </article>
  );
}
export default Main;
