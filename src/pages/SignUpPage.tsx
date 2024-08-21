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

interface SignUpPageProps {
  onSubmit: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSubmit }) => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const [inputName, setInputName] = useState("");
  const [inputStudentNumber, setInputStudentNumber] = useState("");
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [inputEmail, setInputEmail] = useState("");

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
    setShowAlert(true);
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
            name={inputName}
            onChange={(e) => setInputName(e.target.value)}
            required
          ></input>
          <label className="SignUpPage__label" htmlFor="studentNumber">
            학번
          </label>
          <input
            className="SignUpPage__input"
            type="text"
            id="input_studentNumber"
            name={inputStudentNumber}
            onChange={(e) => setInputStudentNumber(e.target.value)}
            required
          ></input>
          <label className="SignUpPage__label" htmlFor="username">
            아이디
          </label>
          <input
            className="SignUpPage__input"
            type="text"
            id="input_id"
            name={inputId}
            onChange={(e) => setInputId(e.target.value)}
            required
          ></input>
          <label className="SignUpPage__label" htmlFor="password">
            비밀번호
          </label>
          <input
            className="SignUpPage__input"
            type="password"
            id="input_pw"
            name={inputPw}
            onChange={(e) => setInputPw(e.target.value)}
            required
          ></input>
          <label className="SignUpPage__label" htmlFor="useremail">
            이메일
          </label>
          <input
            className="SignUpPage__input"
            type="email"
            id="input_email"
            name={inputEmail}
            placeholder="Enter email"
            onChange={(e) => setInputEmail(e.target.value)}
            required
          ></input>
          <button
            className="SignUpPage__button"
            type="submit"
            onClick={handleLoginPageClick}
          >
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
      <SignUpModal
        show={showAlert}
        handleClose={handleCloseAlert}
        message="회원가입이 완료되었습니다."
      />
    </div>
  );
};

export default SignUpPage;
