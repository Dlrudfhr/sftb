import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/rogo.png";
import "../assets/css/SearchPwPage.css";

function SearchPwPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };

  const handleSearchPw = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/find-password",
        {
          userName: name,
          email: email,
          userID: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setPassword(response.data);
        setError(null);
      } else {
        setError("비밀번호를 찾을 수 없습니다.");
      }
    } catch (error) {
      setError("비밀번호 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div className="SearchPwPage__container">
      <div className="SearchPwPage__inputForm">
        <img src={logo} alt="image" style={{ width: "25%", height: "auto" }} />
        <div className="SearchPwPage__Title">비밀번호 찾기 및 변경</div>

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

        <div className="form-control">
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={handleIdChange}
            required
          />
          <label>
            <span style={{ transitionDelay: "0ms" }}>U</span>
            <span style={{ transitionDelay: "50ms" }}>s</span>
            <span style={{ transitionDelay: "100ms" }}>e</span>
            <span style={{ transitionDelay: "150ms" }}>r</span>
            <span style={{ transitionDelay: "200ms" }}>I</span>
            <span style={{ transitionDelay: "250ms" }}>D</span>
          </label>
        </div>
        <button className="SearchPwPage__PwButton" onClick={handleSearchPw}>
          비밀번호 변경
        </button>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {password && <div>비밀번호: {password}</div>}
        <br />
        <div className="SeachPwPage__backToLogin">
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

export default SearchPwPage;
