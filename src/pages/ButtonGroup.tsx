import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 훅
import ConfirmLogoutModal from './ConfirmLogoutModal'; // 모달 컴포넌트 임포트
import '../assets/css/ButtonGroup.css'; // 버튼 스타일을 위한 CSS 파일을 임포트합니다.

const ButtonGroup: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const navigate = useNavigate(); // 페이지 이동 훅

  const handleLogout = () => {
    setIsModalOpen(true); // 모달 열기
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    // 로그아웃 처리 로직 추가 (예: 인증 토큰 제거 등)
    // 초기 화면(로그인 페이지)으로 이동
    navigate('/');
  };


  const handleCancelLogout = () => {
    setIsModalOpen(false); // 모달 닫기
  };
  return (
    <div className="button-group">
       <Link to="/store">
        <button className="button-group__button">상점</button>
      </Link>
      <Link to ="/information">
      <button className="button-group__button">내정보</button>
      </Link>
      <button className="button-group__button" onClick={handleLogout}>
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
