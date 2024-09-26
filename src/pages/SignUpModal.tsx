import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../assets/css/SignUpModal.css"; 

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose, message }) => {
  return (
    <Modal 
      show={isOpen} 
      onHide={onClose} 
      dialogClassName="SignUpModal__overlay" // 커스텀 스타일을 적용하기 위한 클래스
      centered // 모달을 화면 가운데에 배치
    >
      <div className="SignUpModal__modal">
        <Modal.Header closeButton>
          <Modal.Title>알림</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={onClose} 
            className="SignUpModal__button" // 버튼에 커스텀 클래스 적용
          >
            닫기
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
};

export default SignUpModal;
