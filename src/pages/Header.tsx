import React, { useState } from "react";
import "../assets/css/Header.css?after"; // '.'은 현재 디렉터리를 의미
import logo from "../assets/images/rogo.png"; // '..'은 현재 디렉터리의 바로 상위 디렉터리(부모 디렉터리)를 의미
import { Link } from "react-router-dom";

const Header = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const toggleSubMenu = () => {
    setSubMenuVisible(!isSubMenuVisible);
  };

  return (
    <header className="Header">
      <div className="Header__container-top">
        <div className="Header__navbar">
          <div className="Header__leftside">
            <div className="Header__logo">
              <Link to="/main">
                <img src={logo} alt="평택대학교" />
              </Link>
            </div>
          </div>
          <div className="Header__sitename">
            <Link to="/main">
              <h1>Started From The Bottom</h1>
            </Link>
          </div>

          {/* 메뉴버튼 */}
          <div className="Header__hamburger_menu" onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </div>

          <div className={`Header__rightside ${isMenuOpen ? "open" : ""}`}>
            {/* 전체화면에서 홈페이지에 커서 놓는 경우 */}
            <div
              className="Header__link-with-dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="#">
                <h4>홈페이지</h4>
              </Link>
              {isSubMenuVisible && (
                <ul className="Header__dropdown-menu">
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

        {/* 메뉴 버튼 클릭시 나오는 것 */}
        {isMenuOpen && (
          <div className="Header__mobile-menu">
            <div onClick={toggleSubMenu}>
              <Link to="#">홈페이지</Link>
            </div>
            {/* 홈페이지 버튼 클릭시 3개나옴 */}
            {isSubMenuVisible && (
              <ul className="Header__dropdown-mobile-menu">
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
            <Link to="/main/SiteIntroduce">사이트소개</Link>
            <Link to="/main/RanKing">랭킹</Link>
            <Link to="/main/Announcement">공지사항</Link>
            <Link to="/main/Organization">조직도</Link>
            <Link to="/main/Inquiry">문의</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
