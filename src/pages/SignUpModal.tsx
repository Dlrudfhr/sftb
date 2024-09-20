import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/SignUpModal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleNavigate = () => {
    onClose();
    navigate("/");
  };
  return (
    <div className="SignUpModal__overlay">
      <div className="SignUpModal__modal">
        <p>회원가입 성공!</p>
        <button className="SignUpModal__button" onClick={handleNavigate}>
          로그인하러가기
        </button>
      </div>
    </div>
  );
};

export default SignUpModal;
