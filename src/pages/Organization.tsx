import React, { useState } from "react";
import "../assets/css/Header.css"; // '.'은 현재 디렉터리를 의미
import logo from "../assets/images/rogo.png"; // '..'은 현재 디렉터리의 바로 상위 디렉터리(부모 디렉터리)를 의미
import { Link } from "react-router-dom";

const Organization = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };

  return (
    <div>
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
                  <h3>홈페이지</h3>
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
              <Link to="/SiteIntroduce">
                <h3>사이트소개</h3>
              </Link>

              <Link to="/RanKing">
                <h3>랭킹</h3>
              </Link>

              <Link to="/Announcement">
                <h3>공지사항</h3>
              </Link>

              <Link to="/Organization">
                <h3>조직도</h3>
              </Link>

              <Link to="/Inquiry">
                <h3>문의</h3>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <body>
        <h1>조직도</h1>
      </body>
    </div>
  );
};

export default Organization;
