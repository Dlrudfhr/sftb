import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../assets/images/rogo.png";
import PTU from "../assets/images/PTU.png";
import SignUpModal from "./SignUpModal";
import "../assets/css/SignUpPage.css";

const SignUpPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState(""); // 에러 메시지 저장
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
          userID,
          studentID,
          password,
          userName,
          email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      setAlertMessage("회원가입이 완료되었습니다."); // 성공 메시지
      setIsModalOpen(true); // 모달 열기
    } catch (error: any) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;

        if (message.includes("Student ID")) {
          setAlertMessage("해당 학번은 이미 존재합니다."); // 학번 중복
        } else if (message.includes("User ID")) {
          setAlertMessage("해당 아이디는 이미 존재합니다."); // 아이디 중복
        } else if (message.includes("Email")) {
          setAlertMessage("해당 이메일은 이미 존재합니다."); // 이메일 중복
        } else {
          setAlertMessage(message || "회원가입 실패"); // 일반적인 에러 처리
        }
      } else {
        setAlertMessage("회원가입 실패: 서버 오류"); // 서버 오류 처리
      }
    }
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
            required
          />
          <button className="SignUpPage__button" type="submit">
            회원가입
          </button>
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
      {/* 모달에 alertMessage 전달 */}
      <SignUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={alertMessage} // 에러 메시지 전달
      />
    </div>
  );
};

export default SignUpPage;
