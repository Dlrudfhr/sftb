import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../assets/css/SignUpModal.css";
import { useNavigate } from "react-router-dom";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  isOpen,
  onClose,
  message,
}) => {
  const navigate = useNavigate();
  const handleClose = () => {
    onClose(); // 모달 닫기
    navigate("/"); // '/' 경로로 이동
  };
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      dialogClassName="SignUpModal__overlay" // 커스텀 스타일을 적용하기 위한 클래스
      centered // 모달을 화면 가운데에 배치
    >
      <div className="SignUpModal__modal">
        <div className="SignUpModal__message">회원가입이 완료되었습니다!</div>
        <button className="SignUpModal__button" onClick={handleClose}>
          닫기
        </button>
      </div>
    </Modal>
  );
};

export default SignUpModal;
