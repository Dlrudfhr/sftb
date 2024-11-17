import React, { useState, useRef } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const SiteIntroduce = () => {
  const firstElement = useRef<null | HTMLDivElement>(null); //스크롤 될 첫번째 위치요소
  const secondElement = useRef<null | HTMLDivElement>(null); //스크롤 될 두번째 위치요소
  const thirdElement = useRef<null | HTMLDivElement>(null); //스크롤 될 세번째 위치요소
  const fourthElement = useRef<null | HTMLDivElement>(null); //스크롤 될 네번째 위치요소

  const onMoveBox = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      const elementTop =
        ref.current.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementTop - 120, behavior: "smooth" });
    }
  };

  return (
    <div>
      <Header />
      <Footer />
    </div>
  );
};

export default SiteIntroduce;
