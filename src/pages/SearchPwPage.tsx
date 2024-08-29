import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>비밀번호 찾기</h1>
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
      <button onClick={handleBackToLogin}>로그인 페이지로 돌아가기</button>
    </div>
  );
}

export default SearchPwPage;
