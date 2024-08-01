import React from "react";
import { useNavigate } from "react-router-dom";

function Test() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}
export default Test;
