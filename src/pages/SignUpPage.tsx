import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import logo from "../assets/images/rogo.png";
import { useNavigate } from "react-router-dom";
import "../assets/css/SignUpPage.css";
import PTU from "../assets/images/PTU.png";
import SignUpModal from "./SignUpModal";
import axios from "axios";

const SignUpPage: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);

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
      setShowAlert(true); // 회원가입 성공 시 알림 표시
    } catch (error) {
      console.error("회원가입 실패:", error); // 에러 발생 시 콘솔에 출력
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
        <img src={PTU} alt="image" />
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
              alt="image"
              style={{ width: "50%", height: "auto" }}
            />
          </div>
          <h3 className="SignUpPage__h3">Started From The Bottom</h3>

          <label className="SignUpPage__label" htmlFor="username">
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
          ></input>
          <label className="SignUpPage__label" htmlFor="studentNumber">
            학번
          </label>
          <input
            className="SignUpPage__input"
            type="text"
            id="input_studentNumber"
            name="StudentID"
            value={studentID}
            onChange={(e) => setStudentID(e.target.value)}
            required
          ></input>
          <label className="SignUpPage__label" htmlFor="username">
            아이디
          </label>
          <input
            className="SignUpPage__input"
            type="text"
            id="input_id"
            name="UserID"
            value={userID}
            onChange={(e) => setUserID(e.target.value)}
          ></input>
          <label className="SignUpPage__label" htmlFor="password">
            비밀번호
          </label>
          <input
            className="SignUpPage__input"
            type="password"
            id="input_pw"
            name="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
          <label className="SignUpPage__label" htmlFor="useremail">
            이메일
          </label>
          <input
            className="SignUpPage__input"
            type="email"
            id="input_email"
            name="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            required
          ></input>
          <button className="SignUpPage__button">회원가입</button>
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
        message="회원가입이 완료되었습니다."
      />
    </div>
  );
};

export default SignUpPage;
