import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/SearchIdPage.css";
import logo from "../assets/images/rogo.png";

function SearchIdPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSearchId = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/find-id",
        {
          userName: name,
          email: email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setUserId(response.data);
        setError(null);
      } else {
        setError("사용자 ID를 찾을 수 없습니다.");
      }
    } catch (error) {
      setError("사용자 ID 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/");
  };
  const handleGotoPassword = () => {
    navigate("/SearchPwPage");
  };

  return (
    <div className="SearchIdPage__container">
      <div className="SearchIdPage__inputForm">
        <img src={logo} alt="image" style={{ width: "25%", height: "auto" }} />
        <div className="SearchIdPage__Title">아이디 찾기</div>

        <div className="form-control">
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
          <label>
            <span style={{ transitionDelay: "0ms" }}>U</span>
            <span style={{ transitionDelay: "50ms" }}>s</span>
            <span style={{ transitionDelay: "100ms" }}>e</span>
            <span style={{ transitionDelay: "150ms" }}>r</span>
            <span style={{ transitionDelay: "200ms" }}>n</span>
            <span style={{ transitionDelay: "250ms" }}>a</span>
            <span style={{ transitionDelay: "300ms" }}>m</span>
            <span style={{ transitionDelay: "350ms" }}>e</span>
          </label>
        </div>

        <div className="form-control">
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
          <label>
            <span style={{ transitionDelay: "0ms" }}>E</span>
            <span style={{ transitionDelay: "50ms" }}>m</span>
            <span style={{ transitionDelay: "100ms" }}>a</span>
            <span style={{ transitionDelay: "150ms" }}>i</span>
            <span style={{ transitionDelay: "200ms" }}>l</span>
          </label>
        </div>

        <button className="SearchIdPage__IdButton" onClick={handleSearchId}>
          아이디 찾기
        </button>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {userId && <div>사용자 ID: {userId}</div>}
        <br />
        <div className="SearchIdPage__goToPassword">
          <span
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={handleGotoPassword}
          >
            비밀번호 찾으러 가기
          </span>
        </div>
        <div className="SeachIdPage__backToLogin">
          <span
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={handleBackToLogin}
          >
            로그인 페이지로 돌아가기
          </span>
        </div>
      </div>
    </div>
  );
}

export default SearchIdPage;
