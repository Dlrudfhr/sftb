import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CongratulationsModal from "../pages/CongratulatoryModal"; // 모달 컴포넌트 가져오기
import "../assets/css/loginPage.css";
import PTU from "../assets/images/PTU.png";
import logo from "../assets/images/rogo.png";

function LoginPage() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태 추가
  const navigate = useNavigate();

  const handleMainClick = async (event: React.FormEvent) => {
    event.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        {
          userID: inputId,
          password: inputPw,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // 로그인 성공 여부 및 신규 회원 확인
      if (response.status === 200 && response.data.userID) {
        const { userID, userName, newMember } = response.data; // 필요한 값들을 구조 분해 할당으로 가져옴
        sessionStorage.setItem("authenticated", "true");
        localStorage.setItem("memberId", userID); // userID를 localStorage에 저장
        localStorage.setItem("userName", userName); // userName을 localStorage에 저장
        
        const isNewMember = response.data.newMember; // API로부터 신규 회원 여부 가져오기
        sessionStorage.setItem("isNewMember", newMember.toString()); // 신규 회원 여부를 세션 스토리지에 저장
        
        if (isNewMember) {
          setIsModalOpen(true); // 신규 회원이면 모달 열기
        } else {
          navigate("/Main"); // 신규 회원이 아닐 경우 메인 페이지로 이동
        }
      }
    } catch (error) {
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  const handleSignUpClick = () => {
    navigate("/SignUp"); // 회원가입 페이지로 이동
  };

  const handleSearchIDClick = () => {
    navigate("/SearchIdPage"); // 아이디 찾기 페이지로 이동
  };

  const handleSearchPwClick = () => {
    navigate("/SearchPwPage"); // 비밀번호 찾기 페이지로 이동
  };

  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    navigate("/Main"); // 메인 페이지로 이동
  };

  return (
    <>
      <div className="loginPage__container">
        <div className="loginPage__imageSection">
          <img src={PTU} alt="image" />
        </div>
        <div className="loginPage__loginSection">
          <form className="loginPage__form" onSubmit={handleMainClick}>
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
              value={inputId}
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
              value={inputPw}
              onChange={(e) => setInputPw(e.target.value)}
              required
            ></input>
            <br />
            {errorMessage && (
              <div style={{ color: "red", marginBottom: "10px" }}>
                {errorMessage}
              </div>
            )}
            <button className="loginPage__button" type="submit">
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
                비밀번호 찾기 및 변경
              </span>
            </div>
          </form>
        </div>
      </div>
      
      <CongratulationsModal isOpen={isModalOpen} onClose={closeModal} /> {/* 모달 컴포넌트 추가 */}
    </>
  );
}

export default LoginPage;
