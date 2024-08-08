import React, { useState }  from "react";
import "../assets/css/Footer.css";
import ProgressBarComponent from './ProgressBarComponent'; // ProgressBarComponent를 임포트합니다.
import ButtonGroup from './ButtonGroup';
import tierPhoto1 from '../assets/images/tier-photo1.jpg';
import tierPhoto2 from '../assets/images/tier-photo2.jpg';
import tierPhoto3 from '../assets/images/tier-photo3.png';


type LevelImages = {
  [key: string]: string; // 모든 키는 문자열이고, 값은 문자열입니다.
};

const levelImages: LevelImages = {
  "티어1": tierPhoto1,
  "티어2": tierPhoto2,
  "티어3": tierPhoto3,
};


const Footer: React.FC = () => {
  const [level, setLevel] = useState("티어1"); // 초기 레벨 설정
  const percentage1 = 70; // 첫 번째 퍼센트바의 값
  const total1 = 100; // 첫 번째 퍼센트바의 총값
  const percentage2 = 40; // 두 번째 퍼센트바의 값
  const total2 = 100; // 두 번째 퍼센트바의 총값

  const tierPhoto = levelImages[level] || tierPhoto1;

  return (
      <div className="footer-banner">
        <div className="footer-banner__section footer-banner__tier-info">
          <div className="image-container">
          <img src={tierPhoto} alt="티어 사진" /> {/* 현재 레벨에 맞는 이미지 */}
          <div className="image-name">{level} </div> {/* 현재 레벨에 맞는 이름 */}
        </div>
        <div className="text">
        <div className="name">이름</div> {/* 이름 텍스트 */}
          <div className="level">{level}</div> {/* 현재 레벨 텍스트 */}
        </div>
      </div>
      <div className="footer-banner__section footer-banner__progress">
      <ProgressBarComponent now={percentage1} />
      <ProgressBarComponent now={percentage2} />
      </div>
      <div className="footer-banner__section"> <ButtonGroup /> {/* 버튼 그룹을 포함합니다. */}
      </div>
    </div>
  );
};

export default Footer;
