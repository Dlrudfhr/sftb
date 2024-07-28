import React from "react";

import "./Header.css"; /* '.'은 현재 디렉터리를 의미 */
import logo from "../assets/images/rogo.png"; /* ..은 현재 디렉터리의 바로 상위 디렉터리(부모 디렉터리)를 의미 */
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container-top">
        <div className="navbar">
          <div className="leftside">
            <div className="logo">
              <img src={logo} alt="평택대학교" />
            </div>
            <h2>Started From The Bottom</h2>
          </div>
          <div className="rightside">
            <Link to="http://www.ptu.ac.kr">
              <h3>사이트소개</h3>
            </Link>

            <Link to="http://www.ptu.ac.kr">
              <h3>랭킹</h3>
            </Link>

            <Link to="http://www.ptu.ac.kr">
              <h3>공지사항</h3>
            </Link>

            <Link to="http://www.ptu.ac.kr">
              <h3>조직도</h3>
            </Link>

            <Link to="http://www.ptu.ac.kr">
              <h3>홈페이지</h3>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
