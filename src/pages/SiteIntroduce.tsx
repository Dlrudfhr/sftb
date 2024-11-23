import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import IntroImg from "../assets/images/Intro.png";
import TierUp from "../assets/images/TierUp.png";
import "../assets/css/SiteIntroduce.css";
import left from "../assets/images/상점사진/left.png";
import right from "../assets/images/상점사진/right.png";
import topMenu_homepage from "../assets/images/사이트 소개/상단메뉴_홈페이지.png";
import topMenu_Ranking1 from "../assets/images/사이트 소개/상단메뉴_랭킹(1).png";
import topMenu_Ranking2 from "../assets/images/사이트 소개/상단메뉴_랭킹(2).png";
import topMenu_announcement from "../assets/images/사이트 소개/상단메뉴_공지사항.png";
import topMenu_inquiry from "../assets/images/사이트 소개/상단메뉴_문의.png";
import topMenu_inquiry2 from "../assets/images/사이트 소개/상단메뉴_문의(2).png";
import middleMenu_level from "../assets/images/사이트 소개/게시판소개_레벨.png";
import middleMenu_tier from "../assets/images/사이트 소개/게시판소개_티어.png";
import middleMenu_warning from "../assets/images/사이트 소개/게시판소개_주의사항.png";
import bottomMenu_intro1 from "../assets/images/사이트 소개/하단메뉴소개(1).png";
import bottomMenu_intro2 from "../assets/images/사이트 소개/하단메뉴소개(2).png";
import bottomMenu_mypage from "../assets/images/사이트 소개/게시판소개_내정보.png";
import bottomMenu_mypage2 from "../assets/images/사이트 소개/게시판소개_내정보이동.png";
import bottomMenu_store from "../assets/images/사이트 소개/게시판소개_상점.png";
import bottomMenu_store2 from "../assets/images/사이트 소개/게시판소개_상점이동.png";

const topMenuImages = [
  topMenu_homepage,
  topMenu_Ranking1,
  topMenu_Ranking2,
  topMenu_announcement,
  topMenu_inquiry,
  topMenu_inquiry2,
];

const middleMenuImages = [
  middleMenu_level,
  middleMenu_tier,
  middleMenu_warning,
];

const bottomMenuImages = [
  bottomMenu_intro1,
  bottomMenu_intro2,
  bottomMenu_mypage,
  bottomMenu_mypage2,
  bottomMenu_store,
  bottomMenu_store2,
];

const SiteIntroduce = () => {
  const [currentTopIndex, setCurrentTopIndex] = useState(0); // 상단 메뉴 이미지 인덱스
  const [currentMiddleIndex, setCurrentMiddleIndex] = useState(0); // 중간 메뉴 이미지 인덱스
  const [currentBottomIndex, setCurrentBottomIndex] = useState(0); // 하단 메뉴 이미지 인덱스
  const firstElement = useRef<null | HTMLDivElement>(null); //스크롤 될 첫번째 위치요소
  const secondElement = useRef<null | HTMLDivElement>(null); //스크롤 될 두번째 위치요소
  const thirdElement = useRef<null | HTMLDivElement>(null); //스크롤 될 세번째 위치요소
  const handleTopButtonClick = () => {
    setCurrentTopIndex((prevIndex) => (prevIndex + 1) % topMenuImages.length);
  };

  const handleTopButtonPrevClick = () => {
    setCurrentTopIndex(
      (prevIndex) =>
        (prevIndex - 1 + topMenuImages.length) % topMenuImages.length
    );
  };

  const handleMiddleButtonClick = () => {
    setCurrentMiddleIndex(
      (prevIndex) => (prevIndex + 1) % middleMenuImages.length
    );
  };

  const handleMiddleButtonPrevClick = () => {
    setCurrentMiddleIndex(
      (prevIndex) =>
        (prevIndex - 1 + middleMenuImages.length) % middleMenuImages.length
    );
  };

  const handleBottomButtonClick = () => {
    setCurrentBottomIndex(
      (prevIndex) => (prevIndex + 1) % bottomMenuImages.length
    );
  };

  const handleBottomButtonPrevClick = () => {
    setCurrentBottomIndex(
      (prevIndex) =>
        (prevIndex - 1 + bottomMenuImages.length) % bottomMenuImages.length
    );
  };

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const elementTop =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - 185, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header />
      <div className="SiteIntroduce__container">
        <div className="SiteIntroduce__intros">
          <div className="SiteIntroduce__firstIntro">
            SFTB에 접속하신것을 환영합니다!
          </div>
          <div className="SiteIntroduce__Intro">
            SFTB는 정보통신학과 여러분들의 효율적인 정보공유와 선후배간 활발한
            소통을 위해 제작되었습니다.
          </div>
          <div className="SiteIntroduce__Intro">
            열심히 활동한 분들께는 레벨 및 티어의 상승으로 다양한 물품과 교환할
            수 있는 성과금이 지급됩니다.
          </div>
        </div>
        <ul className="SiteIntroduce__boxes">
          <li className="SiteIntroduce__box">
            <span
              title="상단 메뉴 소개로 이동"
              onClick={() => onMoveBox(firstElement)}
            >
              상단 메뉴 소개로 이동
            </span>
          </li>
          <li className="SiteIntroduce__box">
            <span
              title="게시판 소개로 이동"
              onClick={() => onMoveBox(secondElement)}
            >
              게시판 소개로 이동
            </span>
          </li>
          <li className="SiteIntroduce__box">
            <span
              title="하단 메뉴 소개로 이동"
              onClick={() => onMoveBox(thirdElement)}
            >
              하단 메뉴 소개로 이동
            </span>
          </li>
        </ul>
        <div className="SiteIntroduce__IntroLevelTierContainer">
          <div className="SiteIntroduce__IntroLevelTier">
            레벨 및 경험치 시스템 소개
          </div>
          <br />
          <div className="SiteIntroduce__Intro">레벨을 상승시키는 방법 </div>
          <div className="SiteIntroduce__Intro">1. 게시글을 작성하기</div>
          <div className="SiteIntroduce__Intro">
            2. 본인이 작성한 게시글 외의 게시글에 댓글을 작성하기
          </div>
          <br />
          <div className="SiteIntroduce__Intro">티어를 상승시키는 방법 </div>
          <div className="SiteIntroduce__Intro">
            1. 멘토멘티, 프로젝트 개발, 코딩문제 게시판 활동에서 경험치를 획득할
            수 있습니다. 관리자의 채택을 받게 될 경우 최종적으로 경험치를
            획득하게 됩니다.
          </div>
          <div className="SiteIntroduce__Intro">
            2. 코딩문제 게시판의 경우 관리자만 게시글을 작성하게 되고 문제를 잘
            푼 회원들에게 채택을 남기게 되면 해당 회원은 티어 경험치를 획득하게
            됩니다.
          </div>
          <div className="SiteIntroduce__Intro">
            3. 특정 게시글에 작성한 댓글이 관리자가 아닌 다른 사용자에게
            채택되는 경우에 경험치를 획득합니다.
          </div>
          <div className="SiteIntroduce__Intro"></div>
          <div className="SiteIntroduce__iamgeContainer">
            <img src={TierUp} />
            <div className="SiteIntroduce__fighting">
              사장이 되는 그날까지 화이팅!{" "}
            </div>
          </div>
        </div>

        <div className="SiteIntroduce__imageContainer" ref={firstElement}>
          <button
            className="SiteIntroduce__leftbutton"
            onClick={handleTopButtonPrevClick}
          >
            <img src={left}></img>
          </button>
          <img
            className="SiteIntroduce__img"
            src={topMenuImages[currentTopIndex]}
          />
          <button
            className="SiteIntroduce__rigthbutton"
            onClick={handleTopButtonClick}
          >
            <img src={right}></img>
          </button>
        </div>
        <div className="SiteIntroduce__imageContainer" ref={secondElement}>
          <button
            className="SiteIntroduce__leftbutton"
            onClick={handleMiddleButtonPrevClick}
          >
            <img src={left}></img>
          </button>
          <img
            className="SiteIntroduce__img"
            src={middleMenuImages[currentMiddleIndex]}
          />
          <button
            className="SiteIntroduce__rigthbutton"
            onClick={handleMiddleButtonClick}
          >
            <img src={right}></img>
          </button>
        </div>
        <div className="SiteIntroduce__imageContainer" ref={thirdElement}>
          <button
            className="SiteIntroduce__leftbutton"
            onClick={handleBottomButtonPrevClick}
          >
            <img src={left}></img>
          </button>
          <img
            className="SiteIntroduce__img"
            src={bottomMenuImages[currentBottomIndex]}
          />
          <button
            className="SiteIntroduce__rigthbutton"
            onClick={handleBottomButtonClick}
          >
            <img src={right}></img>
          </button>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default SiteIntroduce;
