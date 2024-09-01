import React, { Children } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import "../assets/css/loginPage.css";
import SignUpModal from "./SignUpModal";
import SignUpPage from "./SignUpPage";
import PTU from "../assets/images/PTU.png";
import logo from "../assets/images/rogo.png";
import DefaultLayout from "./DefaultLayout";

import { Link, useNavigate } from "react-router-dom";

interface LoginPage {
  children: any;
}

function LoginPage() {
  const [showSignUp, setShowSignUp] = useState(true);

  const [loggedIn, setloggedIn] = useState(true);
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const navigate = useNavigate();

  const correctUsername = "yourUsername";
  const correctPassword = "yourpassword";

  const handleMainClick = () => {
    navigate("/Main");
  };

  const handleSignUpClick = () => {
    navigate("/SignUp");
  };

  const handleSearchIDClick = () => {
    navigate("/SearchIdPage");
  };

  const handleSearchPwClick = () => {
    navigate("/SearchPwPage");
  };

  return (
    <>
      <div className="loginPage__container">
        <div className="loginPage__imageSection">
          <img src={PTU} alt="image" />
        </div>
        <div className="loginPage__loginSection">
          <form className="loginPage__form">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={logo}
                alt="image"
                style={{ width: "50%", height: "auto" }}
              />
            </div>
            <h3 className="loginPage__h3">Started From The Bottom</h3>
            <label className="loginPage__label" htmlFor="username">
              아이디
            </label>
            <input
              className="loginPage__input"
              type="text"
              id="input_id"
              name={inputId}
              onChange={(e) => setInputId(e.target.value)}
              required
            ></input>
            <br />
            <label className="loginPage__label" htmlFor="password">
              비밀번호
            </label>
            <input
              className="loginPage__input"
              type="password"
              id="input_pw"
              name={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
              required
            ></input>
            <br />
            <button
              className="loginPage__button"
              type="submit"
              onClick={handleMainClick}
            >
              로그인
            </button>
            <button
              className="loginPage__button"
              type="button"
              onClick={handleSignUpClick}
            >
              회원가입
            </button>
            <div className="LoginPage__SearchId">
              <span
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={handleSearchIDClick}
              >
                아이디 찾기
              </span>
            </div>
            <div className="LoginPage__SearchPw">
              <span
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={handleSearchPwClick}
              >
                비밀번호 찾기
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
