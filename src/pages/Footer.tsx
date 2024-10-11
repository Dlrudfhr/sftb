import React from "react";
import ProgressBar from "./ProgressBar";
import icon from "../assets/images/company_icon.png";

const Footer: React.FC = () => {
  return (
    <div>
      <ProgressBar progress={70} icon={icon} />
    </div>
  );
};

export default Footer;
