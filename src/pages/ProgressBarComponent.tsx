import React from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/ProgressBarComponent.css'; // CSS 파일을 임포트합니다.

interface ProgressBarComponentProps {
  now: number; // 현재 퍼센트바 값
  }

const ProgressBarComponent: React.FC<ProgressBarComponentProps> = ({ now }) => {
  return (
    <div style={{ width: '100%', textAlign: 'center' }}>
      <ProgressBar 
        now={now} 
        label={`${now}`} // 현재 값과 전체 값을 표시
        className="gradient-progress-bar" // CSS 클래스 적용
      />
    </div>
  );
};
export default ProgressBarComponent;
