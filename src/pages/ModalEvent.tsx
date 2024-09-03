import React from 'react';
import '../assets/css/ConfirmLogoutModal.css'; // 모달 스타일을 위한 CSS 파일

interface ModalEventProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalEvent: React.FC<ModalEventProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // 모달이 열려 있지 않으면 아무 것도 렌더링하지 않음

  return (
    <div className="modal-overlay">
        <div className="modal-buttons">
        
          <button onClick={onClose}>아니오</button>
        </div>
    </div>
  );
};

export default ModalEvent;