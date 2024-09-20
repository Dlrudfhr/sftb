import React from "react";
import "../assets/css/ConfirmLogoutModal.css"; // 모달 스타일을 위한 CSS 파일

interface ConfirmLogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null; // 모달이 열려 있지 않으면 아무 것도 렌더링하지 않음

  return (
    <div className="ConfirmLogoutModal__overlay">
      <div className="ConfirmLogoutModal__content">
        <h2>로그아웃 하시겠습니까?</h2>
        <div className="ConfirmLogoutModal__buttons">
          <button onClick={onConfirm}>예</button>

          <button onClick={onClose}>아니오</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogoutModal;
