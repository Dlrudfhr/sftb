import React from "react";
import "../assets/css/ButtonGroup.css"; // 버튼 스타일을 위한 CSS 파일을 임포트합니다.

const ButtonGroup = () => {
  return (
    <div className="button-group">
      <button className="button-group__button">상점</button>
      <button className="button-group__button">내정보</button>
      <button className="button-group__button">로그아웃</button>
    </div>
  );
};

export default ButtonGroup;
