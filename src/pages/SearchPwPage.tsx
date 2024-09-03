import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchPwPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // 비밀번호 확인 상태 추가
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNewPasswordForm, setShowNewPasswordForm] = useState(false);
  const [isPasswordFound, setIsPasswordFound] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 일치 여부 상태 추가
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

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(value === newPassword); // 비밀번호 일치 여부 체크
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
        setShowNewPasswordForm(true);
        setIsPasswordFound(true);
        setError(null);
      } else {
        setError("비밀번호를 찾을 수 없습니다.");
        setIsPasswordFound(false);
      }
    } catch (error) {
      setError("비밀번호 조회에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!passwordsMatch) {
      setError("새 비밀번호와 확인 비밀번호가 일치하지 않습니다.");
      return;
    }
    
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/auth/reset-password",
        {
          userID: userId,
          newPassword: newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setShowNewPasswordForm(false);
        setPassword("");
        setName("");
        setEmail("");
        setUserId("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError("비밀번호 변경에 실패했습니다.");
      }
    } catch (error) {
      setError("비밀번호 변경에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>비밀번호 찾기</h1>
      {!showNewPasswordForm ? (
        <div>
          <div>
            <label htmlFor="name">이름:</label>
            <input type="text" id="name" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div>
            <label htmlFor="userId">아이디:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleIdChange}
            />
          </div>
          <button onClick={handleSearchPw}>비밀번호 찾기</button>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {password && <div>비밀번호: {password}</div>}
        </div>
      ) : (
        <div>
          <h2>새 비밀번호 입력</h2>
          <div>
            <label htmlFor="newPassword">새 비밀번호:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">새 비밀번호 확인:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          {!passwordsMatch && <div style={{ color: 'red' }}>새 비밀번호와 확인 비밀번호가 일치하지 않습니다.</div>}
          <button onClick={handleResetPassword} disabled={!passwordsMatch}>
            비밀번호 변경
          </button>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
        </div>
      )}
      <button onClick={handleBackToLogin}>로그인 페이지로 돌아가기</button>
    </div>
  );
}

export default SearchPwPage;
