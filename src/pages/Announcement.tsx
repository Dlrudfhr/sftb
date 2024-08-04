import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Announcement = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);

  const handleMouseEnter = () => {
    setSubMenuVisible(true);
  };

  const handleMouseLeave = () => {
    setSubMenuVisible(false);
  };

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default Announcement;
