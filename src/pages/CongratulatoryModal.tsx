import React from "react";
import axios from "axios";
import "../assets/css/CongratulationsModal.css";
import jobSeekerImg from "../assets/images/jobSeeker.png";
import internImg from "../assets/images/intern.png";

interface CongratulationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CongratulationsModal: React.FC<CongratulationsModalProps> = ({
  isOpen,
  onClose,
}) => {

  const handleClose = async () => {
    try {
      const userID = localStorage.getItem("memberId"); // 로그인한 사용자 ID 가져오기

      if (!userID) {
        console.error("User ID not found in local storage");
        return; // userID가 없을 경우 함수 종료
      }

      // newmember 상태를 false로 업데이트하는 API 호출
      const newMemberResponse = await axios.put(
        `http://localhost:8080/api/auth/users/${userID}/newmember`,
        { newMember: false },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (newMemberResponse.status !== 200) {
        console.error("Failed to update new member status");
        return; // 업데이트 실패 시 함수 종료
      }
      
      // 경험치 업데이트를 위한 API 호출
      const userLevelExperience = 40; // 부여할 레벨 경험치 값
      const expResponse = await axios.put(`/api/auth/experience`, {
        userId: userID,
        userLevelExperience,
      });

      if (expResponse.status === 200) {
        console.log("Experience points updated successfully");
        onClose(); // 모달 닫기
      } else {
        console.error("Failed to update experience points");
      }
    } catch (error) {
      console.error("Error during the update process", error);
    }
  };

  if (!isOpen) return null; // 모달이 열려있지 않으면 렌더링하지 않음

  return (
    <div className="Congratulation__overlay">
      <div className="Congratulation__modal">
        <h1>Congratulation!</h1>
        <div className="Congratulation__content">
          <img
            src={jobSeekerImg}
            alt="취준생"
            className="Congratulation__jobSeekerImage"
          />
          <img
            src={require("../assets/images/arrow.png")}
            alt="화살표"
            className="Congratulation__arrow"
          />
          <img src={internImg} alt="인턴" className="Congratulation__image" />
        </div>
        <div className="Congratulation__info">
          취준생에서 인턴으로 승진했습니다!
        </div>
        <br />
        <button className="Congratulation__button" onClick={handleClose}>
          닫기
        </button>
      </div>
    </div>
  );
};

export default CongratulationsModal;
