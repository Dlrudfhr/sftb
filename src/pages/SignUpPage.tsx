import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import logo from "../assets/images/rogo.png";
import { useNavigate } from "react-router-dom";
import "../assets/css/SignUpPage.css";
import PTU from "../assets/images/PTU.png";
import SignUpModal from "./SignUpModal";
import axios from "axios";

const SignUpPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // To store specific error messages
  const [userID, setUserID] = useState("");
  const [studentID, setStudentID] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/SignUp",
        {
          userID: userID,
          studentID: studentID,
          password: password,
          userName: userName,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data); // 응답 데이터 확인
      setAlertMessage("회원가입이 완료되었습니다."); // Success message
      setShowAlert(true); // 회원가입 성공 시 알림 표시
    } catch (error: any) {
      if (error.response && error.response.data) {
        // Handle specific error messages from the backend
        const { message } = error.response.data;
        
        // Handle the case for duplicate errors
        if (message.includes("Student ID")) {
          setAlertMessage("해당 학번은 이미 존재합니다."); // Student ID exists
        } else if (message.includes("User ID")) {
          setAlertMessage("해당 아이디는 이미 존재합니다."); // User ID exists
        } else if (message.includes("Email")) {
          setAlertMessage("해당 이메일은 이미 존재합니다."); // Email exists
        } else {
          setAlertMessage(message || "회원가입 실패"); // General error message
        }
      } else {
        setAlertMessage("회원가입 실패: 서버 오류"); // Generic error message
      }
      console.error("회원가입 실패:", error); // 에러 발생 시 콘솔에 출력
      setShowAlert(true); // Show alert even on failure
    }
  };
  
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleLoginPageClick = () => {
    navigate("/");
  };

  return (
    <div className="SignUpPage__container">
      <div className="SignUpPage__imageSection">
        <img src={PTU} alt="PTU" />
      </div>
      <div className="SignUpPage__SignUpSection">
        <form className="SignUpPage__form" onSubmit={handleFormSubmit}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{ width: "50%", height: "auto" }}
            />
          </div>
          <h3 className="SignUpPage__h3">Started From The Bottom</h3>

          <label className="SignUpPage__label" htmlFor="userName">
            이름
          </label>
          <input
            className="SignUpPage__input"
            type="text"
            id="input_name"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label className="SignUpPage__label" htmlFor="studentID">
            학번
          </label>
          <input
            className="SignUpPage__input"
            type="text"
            id="input_studentID"
            name="studentID"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            required
          />
          <label className="SignUpPage__label" htmlFor="userID">
            아이디
          </label>
          <input
            className="SignUpPage__input"
            type="text"
            id="input_userID"
            name="userID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
            required
          />
          <label className="SignUpPage__label" htmlFor="password">
            비밀번호
          </label>
          <input
            className="SignUpPage__input"
            type="password"
            id="input_password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className="SignUpPage__label" htmlFor="email">
            이메일
          </label>
          <input
            className="SignUpPage__input"
            type="email"
            id="input_email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          />
          <button className="SignUpPage__button" type="submit">회원가입</button>
          <div className="SignUpPage__returnLoginPage">
            <span
              style={{ cursor: "pointer", color: "#007bff" }}
              onClick={handleLoginPageClick}
            >
              이미 회원이신가요?
            </span>
          </div>
        </form>
      </div>
      <SignUpModal
        show={showAlert}
        handleClose={handleCloseAlert}
        message={alertMessage} // Display specific error message
      />
    </div>
  );
};

export default SignUpPage;
