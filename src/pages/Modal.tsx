import React from "react";
import { useState } from "react";
import { Routes, Route, Link ,useNavigate} from "react-router-dom";
import ModalEvent from "./ModalEvent"; // 모달 컴포넌트 임포트


const Modal: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
    const navigate = useNavigate(); // 페이지 이동 훅
  
    const handleLogout = () => {
      setIsModalOpen(true); // 모달 열기
    };
  
    const handleCancelModal = () => {
      setIsModalOpen(false); // 모달 닫기
    };
    return (
      <div className="Modal_boxes">
        <Link to="/">
          <button className="Modal_event">모달 콘텐츠</button>
        </Link>
        <Link to="/">
          <button className="Modal_event">모달 콘텐츠 2</button>
        </Link>
        
        <ModalEvent
          isOpen={isModalOpen}
          onClose={handleCancelModal}
        />
      </div>
    );
  };
  
  export default Modal;
  