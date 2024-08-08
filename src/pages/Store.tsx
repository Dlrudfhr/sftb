import React from 'react';
import Header from './Header'; // 상단 배너 컴포넌트
import Footer from './Footer'; // 하단 배너 컴포넌트
import '../assets/css/Store.css';

const Store: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
      <div>
        <Header /> {/* 상단 배너 */}
        <h1> 상점 페이지</h1>
        <Footer /> {/* 하단 배너 */}
      </div>
    );
  };
  
  export default Store;