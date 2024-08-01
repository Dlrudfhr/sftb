import React, { Children } from "react";
import ReactDOM from "react-dom";
import { useState } from "react";
import { ReactNode } from "react";
import "./loginPage.css";
import SignUpModal from "./SignUpModal";
import SignUpPage from "./SignUpPage";
import cccImage from "../assets/images/ccc.jpg";
import logo from "../assets/images/rogo.png";

interface LoginPage {
  children: any;
}

function LoginPage() {
  const [showSingUp, setShowSingUp] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleSignUpClick = () => {
    setShowSingUp(true);
    setShowAlert(false);
  };

  const handleFormSubmit = () => {
    setShowSingUp(false);
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  return (
    <>
      <div className="container">
        <div className="imageSection">
          <img src={cccImage} alt="image" />
        </div>
        <div className="loginSection">
          {!showSingUp ? (
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
              <input type="text" id="username" name="username" required></input>
              <br />
              <label htmlFor="password">PassWord</label>
              <input
                type="password"
                id="password"
                name="password"
                required
              ></input>
              <br />
              <button type="submit">로그인</button>
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
