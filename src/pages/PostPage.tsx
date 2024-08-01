import { useParams, useNavigate } from 'react-router-dom';
import React, { Children } from "react";
import { useState } from "react";


const PostPage = () => {
  const {id} = useParams();
  const navigate = useNavigate();

  return(
    <>
      <div>{id}번째 게시물입니다.</div>
      <div onClick = { () => navigate('/')}>홈페이지로 이동하기</div>
    </>


  );
};
export default PostPage;