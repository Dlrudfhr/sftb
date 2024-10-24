import React from "react";
import ProgressBar from "./ProgressBar";
import icon from "../assets/images/company_icon.png";

const Footer: React.FC = () => {
  return (
    <div>
      <ProgressBar icon={icon} />{
      /* progress 값은 이제 ProgressBar 내부에서 처리되므로, 전달할 필요 없음 */}
    </div>
  );
};

export default Footer;