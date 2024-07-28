import React from "react";
import { useNavigate } from 'react-router-dom';

function Test() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/Main_board');
  };

  return (
    <div>
      <h1>Test</h1>
      <button onClick={handleNavigate}>Go to Main Board</button>
    </div>
  );
}
export default Test;