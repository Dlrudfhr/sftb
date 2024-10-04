import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/ProgressBar.css";
import ConfirmLogoutModal from "./ConfirmLogoutModal";
import axios from "axios";

interface ProgressBarProps {
  progress: number;
  icon: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, icon }) => {
  const [expanded, setExpanded] = useState(false);
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setIsModalOpen(true); // 모달 열기
  };

  const handleConfirmLogout = async () => {
    try {
      // 로그아웃 요청을 서버로 보냄 (POST 요청)
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        // 로그아웃이 성공적으로 처리되면 리다이렉트
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("authenticated");
        setIsModalOpen(false);
        navigate("/");
      } else {
        console.error("로그아웃 실패:", response);
      }
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };
  const handleCancelLogout = () => {
    setIsModalOpen(false); // 모달 닫기
  };

  return (
    <div className="ProgressBar__container">
      {!expanded && (
        <svg className="ProgressBar__svg">
          <circle
            className="ProgressBar__circleBg"
            r={radius}
            cx="60"
            cy="60"
          />
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
            <div className="ProgressBar__progressBg">
              <div
                className="ProgressBar__progressFill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="ProgressBar__progressBg">
              <div
                className="ProgressBar__progressFill"
                style={{ width: `${progress}%` }}
              />
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
