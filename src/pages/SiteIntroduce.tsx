import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import IntroImg from "../assets/images/Intro.png";
import TierUp from "../assets/images/TierUp.png";
import "../assets/css/SiteIntroduce.css";
const SiteIntroduce = () => {
  const firstElement = useRef<null | HTMLDivElement>(null); //스크롤 될 첫번째 위치요소
  const secondElement = useRef<null | HTMLDivElement>(null); //스크롤 될 두번째 위치요소
  const thirdElement = useRef<null | HTMLDivElement>(null); //스크롤 될 세번째 위치요소
  const fourthElement = useRef<null | HTMLDivElement>(null); //스크롤 될 네번째 위치요소

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const elementTop =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - 120, behavior: "smooth" });
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
          <li className="SiteIntroduce__box">상단 메뉴 소개로 이동</li>
          <li className="SiteIntroduce__box">게시판 소개로 이동</li>
          <li className="SiteIntroduce__box">하단 메뉴 소개로 이동</li>
        </ul>
        <div className="SiteIntroduce__IntroLevelTierContainer">
          {" "}
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
            수 있습니다. 위와 같은 활동은 관리자의 인증을 받게 될 경우
            최종적으로 경험치를 획득하게 됩니다.
          </div>
          <div className="SiteIntroduce__Intro">
            2. 특정 게시글에 작성한 댓글이 관리자가 아닌 다른 사용자에게
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
        <div className="SiteIntroduce__imageContainer">
          <img className="SiteIntroduce__img" src={IntroImg} />
        </div>
      </div>
    </div>
  );
};

export default SiteIntroduce;
