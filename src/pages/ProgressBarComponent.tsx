import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/ProgressBarComponent.css"; // CSS 파일을 임포트합니다.

interface ProgressBarComponentProps {
  now: number;
}

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({ now }) => {
  return (
    <div style={{ width: "100%", textAlign: "center" }}>
      <ProgressBar
        now={now}
        label={`${now}%`}
        className="gradient-progress-bar" // CSS 클래스 적용
      />
    </div>
  );
};
export default ProgressBarComponent;
