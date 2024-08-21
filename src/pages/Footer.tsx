import React, { useState } from "react";
import "../assets/css/Footer.css";
import ProgressBarComponent from "./ProgressBarComponent"; // ProgressBarComponent를 임포트합니다.
import ButtonGroup from "./ButtonGroup";
import tierPhoto1 from "../assets/images/tier-photo1.jpg";
import tierPhoto2 from "../assets/images/tier-photo2.jpg";
import tierPhoto3 from "../assets/images/tier-photo3.png";

type LevelImages = {
  [key: string]: string; // 모든 키는 문자열이고, 값은 문자열입니다.
};

const levelImages: LevelImages = {
  티어1: tierPhoto1,
  티어2: tierPhoto2,
  티어3: tierPhoto3,
};

const Footer: React.FC = () => {
  const [level, setLevel] = useState("1레벨"); // 초기 레벨 설정
  const [tier, settier] = useState("신입사원");
  const tierPhoto = levelImages[level] || tierPhoto1;
  const [value, setvalue] = useState<number>(70);
  const max = 100;
  const percentage = (value / max) * 100;
  const [isBannerVisible, setIsBannerVisible] = useState(true); // 배너 가시성 상태

  const toggleBanner = () => {
    setIsBannerVisible(!isBannerVisible);
  };

  return (
    <div className="Footer__container">
      <button
        className={`Footer__toggleButton ${isBannerVisible ? "" : "hidden"}`}
        onClick={toggleBanner}
      >
        {isBannerVisible ? "◀" : "▶"}
      </button>
      <div className={`Footer__banner ${isBannerVisible ? "" : "hidden"}`}>
        <div className="Footer__leftSection">
          <div className="Footer__image">
            <img src={tierPhoto} alt="티어 사진" />
            <div className="image-name">{tier}</div>
          </div>
          <div className="Footer__text">
            <div className="Footer__textlevel">{level}</div> <br />
            <div className="Footer__textname">이름</div>
          </div>
        </div>

        <div className="Footer__midSection">
          <div className="Footer__levelprogress">
            <div className="Footer__levelName">레벨</div>
            <progress max={max} value={value}></progress>
            <span
              style={{
                position: "absolute",
                left: `${percentage}%`,
                top: "70%",
                transform: "translateY(-50%)",
                color: "black",
              }}
            >
              {percentage.toFixed(0)}%
            </span>
          </div>
          <div className="Footer__tierprogress">
            <div className="Footer__tierName">티어</div>
            <progress max={max} value={value}></progress>
            <span
              style={{
                position: "absolute",
                left: `${percentage}%`,
                top: "70%",
                transform: "translateY(-50%)",
                color: "black",
              }}
            >
              {percentage.toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="Footer__rightSection">
          <ButtonGroup />
        </div>
      </div>
    </div>
  );
};

export default Footer;
