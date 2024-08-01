import React from "react";
import "./Footer.css";
import ProgressBarComponent from './ProgressBarComponent'; // ProgressBarComponent를 임포트합니다.
import ButtonGroup from './ButtonGroup';

const Footer: React.FC = () => {
  const percentage = 70; // 퍼센트 일단 70으로 잡음

  return (
      <div className="footer-banner">
      <div className="footer-banner__section">티어 사진/레벨/이름</div>
      <div className="footer-banner__section">
      <ProgressBarComponent now={percentage}/></div>
      <div className="footer-banner__section"> <ButtonGroup /> {/* 버튼 그룹을 포함합니다. */}
      </div>
    </div>
      
  );
};

export default Footer;