import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 훅
import ConfirmLogoutModal from "./ConfirmLogoutModal"; // 모달 컴포넌트 임포트
import "../assets/css/ButtonGroup.css"; // 버튼 스타일을 위한 CSS 파일을 임포트합니다.
import axios from 'axios';
const ButtonGroup: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const navigate = useNavigate(); // 페이지 이동 훅

  const handleLogout = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleConfirmLogout = async () => {
    try {
      // 로그아웃 요청을 서버로 보냄 (POST 요청)
      const response = await axios.post('http://localhost:8080/api/auth/logout', {}, {
        withCredentials: true
      });
      if (response.status === 200) {
        // 로그아웃이 성공적으로 처리되면 리다이렉트
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('authenticated');
        setIsModalOpen(false);
        navigate("/");
      } 
      else {
        console.error('로그아웃 실패:', response);
      }
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
    }
  };
  const handleCancelLogout = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  return (
    <div className="buttonGroup__container">
      <Link to="/store">
        <button className="buttonGroup__button">상점</button>
      </Link>
      <Link to="/information">
        <button className="buttonGroup__button">내정보</button>
      </Link>
      <button className="buttonGroup__button" onClick={handleLogout}>
        로그아웃
      </button>
      <ConfirmLogoutModal
        isOpen={isModalOpen}
        onClose={handleCancelLogout}
        onConfirm={handleConfirmLogout}
      />
    </div>
  );
};

export default ButtonGroup;
