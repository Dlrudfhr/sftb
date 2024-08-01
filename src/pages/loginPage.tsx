import React, { Children } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { useEffect } from "react";
import { ReactNode } from "react";
import "./loginPage.css";
import SignUpModal from "./SignUpModal";
import SignUpPage from "./SignUpPage";
import cccImage from "../assets/images/ccc.jpg";
import logo from "../assets/images/rogo.png";
import DefaultLayout from "./DefaultLayout";
import axios from "axios";
import mysql, { Connection } from "mysql2";

interface LoginPage {
  children: any;
}

function LoginPage() {
  const [showSignUp, setShowSignUp] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [loggedIn, setloggedIn] = useState(true);
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");

  const correctUsername = "yourUsername";
  const correctPassword = "yourpassword";

  const bcrypt = require("bcrypt");

  const handleMainClick = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = "SELECT password FROM users WHERE username = ?";

    connection.query(
      query,
      [inputId],
      async (
        err: mysql.QueryError | null,
        results: any,
        fields: mysql.FieldPacket[]
      ) => {
        if (err) {
          console.error("Error executing query:", err);
          return;
        }

        if (results.length > 0) {
          const hashedPassword = results[0].password;
          const match = await bcrypt.compare(inputPw, hashedPassword);

          if (match) {
            setloggedIn(true);
            alert("로그인 성공!");
          } else {
            alert("아이디 또는 비밀번호가 일치하지 않습니다.");
          }
        } else {
          alert("아이디 또는 비밀번호가 일치하지 않습니다.");
        }
      }
    );
  };

  const mysql = require("mysql2");

  const connection: Connection = mysql.createConnection({
    host: "localhost",
    user: "yourUsername",
    password: "yourPassword",
    database: "yourDatabase",
  });

  connection.connect((err: mysql.QueryError | null) => {
    if (err) {
      console.error("Error connecting to the database:", err);
      return;
    }
    console.log("Connected to the database.");
  });

  const handleSignUpClick = () => {
    //회원가입 열기
    setShowSignUp(false);
    setShowAlert(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hashedPassword = await bcrypt.hash(inputPw, 10);
    const query = "INSERT INTO users (username, password) VALUES (?, ?)";

    connection.query(
      query,
      [inputId, hashedPassword],
      (
        err: mysql.QueryError | null,
        results: any,
        fields: mysql.FieldPacket[]
      ) => {
        if (err) {
          console.error("Error executing query:", err);
          return;
        }
        setShowSignUp(false);
        setShowAlert(true);
      }
    );
  };

  const handleCloseAlert = () => {
    //모달창의 닫기를 누를때
    setShowAlert(false);
    setShowSignUp(true);
  };

  return (
    <>
      <div className="container">
        <div className="imageSection">
          <img src={cccImage} alt="image" />
        </div>
        {!loggedIn ? (
          <DefaultLayout children={undefined} />
        ) : (
          <div className="loginSection">
            {showSignUp ? (
              <form>
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
                <h2>Started From The Bottom</h2>
                <label htmlFor="username">UserName</label>
                <input
                  type="text"
                  id="input_id"
                  name="{inputId}"
                  onChange={(e) => setInputId(e.target.value)}
                  required
                ></input>
                <br />
                <label htmlFor="password">PassWord</label>
                <input
                  type="password"
                  id="input_pw"
                  name="{inputPw}"
                  onChange={(e) => setInputPw(e.target.value)}
                  required
                ></input>
                <br />
                <button type="submit" onClick={handleMainClick}>
                  로그인
                </button>
                <button type="button" onClick={handleSignUpClick}>
                  회원가입
                </button>
              </form>
            ) : (
              <div className="signUpSection">
                <SignUpPage onSubmit={handleFormSubmit} />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="SignUpModalSection">
        <SignUpModal
          show={showAlert}
          handleClose={handleCloseAlert}
          message="회원가입이 완료되었습니다."
        />
      </div>
    </>
  );
}

export default LoginPage;
