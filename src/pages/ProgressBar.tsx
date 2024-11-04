import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/ProgressBar.css";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import axios from "axios";

interface ProgressBarProps {
  icon: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ icon }) => {
  const [progress, setProgress] = useState(0); // 첫 번째 게이지에 반영될 경험치 상태
  const [tierProgress, setTierProgress] = useState(0); // 두 번째 게이지를 위한 상태
  const [totalExperience, setTotalExperience] = useState(100); // 총 경험치 (예: 100)
  const [userLevel, setUserLevel] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (tierProgress / totalExperience) * circumference;

  // 로그인한 사용자 ID를 localStorage에서 가져옴
  const userId = localStorage.getItem("memberId");

  useEffect(() => {
    const fetchExperienceData = async () => {
      try {
        if (userId) {
          // 경험치랑 티어 경험치 데이터를 가져오는 API 호출
          const response = await axios.get(
            `http://localhost:8080/api/auth/users/${userId}/experience`
          );
          setProgress(response.data.userLevelExperience); // 첫 번째 게이지 - 레벨 경험치 반영
          setTierProgress(response.data.tierExperience); // 두 번째 게이지 - 티어 경험치 반영
          setTotalExperience(100); // 총 경험치 설정 (예: 100)
          setUserLevel(response.data.userLevel);
        }
      } catch (error) {
        console.error("경험치 데이터를 가져오는 중 오류 발생:", error);
      }
    };
  
    fetchExperienceData();
  }, [userId]);

  
  useEffect(() => {
    document.documentElement.style.setProperty("--offset", `${offset}`);
  }, [offset]);

  const handleIconClick = () => {
    setExpanded(!expanded);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    setIsModalOpen(true); // 로그아웃 모달 열기
  };

  const handleConfirmLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authenticated");
        localStorage.removeItem("memberId"); // 로그아웃 시 사용자 ID 제거
        setIsModalOpen(false);
        navigate("/");
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false); // 로그아웃 모달 닫기
  };

  return (
    <div className="ProgressBar__container">
      {!expanded && (
        <svg className="ProgressBar__svg">
          <circle className="ProgressBar__circleBg" r={radius} cx="60" cy="60" />
          <circle
            className="ProgressBar__circle"
            r={radius}
            cx="60"
            cy="60"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        </svg>
      )}
      <img
        src={icon}
        alt="icon"
        onClick={handleIconClick}
        className="ProgressBar__icon"
      />
      {expanded && (
        <>
          <div className="ProgressBar__expandedMenu">
            <ul>
              <li
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={() => handleNavigation("/information")}
              >
                내 정보
              </li>
              <li
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={() => handleNavigation("/store")}
              >
                상점
              </li>
              <li
                style={{ cursor: "pointer", color: "#007bff" }}
                onClick={handleLogout}
              >
                로그아웃
              </li>
            </ul>
          </div>
        <div className="ProgressBar__expandedProgress">
               {/* 첫 번째 게이지 - 경험치 */}
          <div className="ProgressBar__progressBg">
          <div
              className="ProgressBar__progressFill"
              style={{ width: `${progress}%` }} // 첫 번째 게이지 - 사용자 경험치
              />
          </div>
           <div className="ProgressBar__labelContainer">
            <span className="ProgressBar__label">경험치: {progress} / 100</span> {/* 경험치 표시 */}
          </div>

              {/* 두 번째 게이지 - Tier */}
          <div className="ProgressBar__progressBg">
          <div
              className="ProgressBar__progressFill"
              style={{ width: `${tierProgress}%` }} // 두 번째 게이지 - tierProgress 예시값
              />
          </div>
            <div className="ProgressBar__labelContainer">
              <span className="ProgressBar__label">티어: {tierProgress} / 100</span> {/* 티어 표시 */}
          </div>
          <div className="ProgressBar__levelContainer">
              <span className="ProgressBar__label">레벨: {userLevel}</span> {/* 사용자 레벨 표시 */}
            </div>
      </div>

          <ConfirmLogoutModal
            isOpen={isModalOpen}
            onClose={handleCancelLogout}
            onConfirm={handleConfirmLogout}
          />
        </>
      )}
    </div>
  );
};

export default ProgressBar;
