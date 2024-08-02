import React, { useState } from "react";
import "../assets/css/Header.css"; // '.'은 현재 디렉터리를 의미
import logo from "../assets/images/rogo.png"; // '..'은 현재 디렉터리의 바로 상위 디렉터리(부모 디렉터리)를 의미
import { Link } from "react-router-dom";

const Header = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };

  return (
    <header>
      <div className="container-top">
        <div className="navbar">
          <div className="leftside">
            <div className="logo">
              <Link to="/">
                <img src={logo} alt="평택대학교" />
              </Link>
            </div>
          </div>
          <div className="sitename">
            <Link to="/">
              <h1>Started From The Bottom</h1>
            </Link>
          </div>
          <div className="rightside">
            <div
              className="link-with-dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="#">
                <h4>홈페이지</h4>
              </Link>
              {isSubMenuVisible && (
                <ul className="dropdown-menu">
                  <li>
                    <Link to="https://haksa.ptu.ac.kr/nx/">e학사</Link>
                  </li>
                  <li>
                    <Link to="https://cyber.ptu.ac.kr/ilos/main/main_form.acl">
                      e클래스
                    </Link>
                  </li>
                  <li>
                    <Link to="http://www.ptu.ac.kr">학교 홈페이지</Link>
                  </li>
                </ul>
              )}
            </div>
            <Link to="/main/SiteIntroduce">
              <h4>사이트소개</h4>
            </Link>

            <Link to="/main/RanKing">
              <h4>랭킹</h4>
            </Link>

            <Link to="/main/Announcement">
              <h4>공지사항</h4>
            </Link>

            <Link to="/main/Organization">
              <h4>조직도</h4>
            </Link>

            <Link to="/main/Inquiry">
              <h4>문의</h4>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
