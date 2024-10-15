import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate 사용
import "../assets/css/CongratulationsModal.css";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate(); // useNavigate 훅 초기화

  const handleClose = async () => {
    try {
      const userID = localStorage.getItem("memberId"); // 로그인한 사용자 ID 가져오기

      if (!userID) {
        console.error("User ID not found in local storage");
        return; // userID가 없을 경우 조기 반환
      }

      // newmember 상태를 false로 업데이트하는 API 호출
      const response = await axios.put(
        `http://localhost:8080/api/auth/users/${userID}/newmember`, // API 엔드포인트
        { newMember: false }, // 요청 본문에 newMember 값을 false로 설정
        {
          withCredentials: true, // 인증 쿠키 포함
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("New member status updated successfully");
        onClose(); // 모달 닫기
        navigate("/Main"); // 메인 페이지로 이동
      } else {
        console.error("Failed to update new member status");
      }
    } catch (error) {
      console.error("Error updating new member status", error);
      // 에러 처리 로직 추가 가능
    }
  };

  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  return (
    <div className="Congratulation__overlay">
      <div className="Congratulation__modal">
        <h2>축하합니다!</h2>
        <p>첫 로그인을 축하합니다! 경험치 40% 증정합니다.</p>
        <button className="Congratulation__button" onClick={handleClose}>
          확인
        </button>
      </div>
    </div>
  );
};

export default CongratulationsModal;
