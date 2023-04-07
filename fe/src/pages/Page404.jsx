import React from "react";
import styled from "styled-components";
import error404 from "../assets/images/error404.png";
import ColorButton from "../components/common/button/ColorButton";
import { useNavigate } from "react-router-dom";

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 5%;
`;

const ErrorImg = styled.img`
  width: 40%;
  height: 40%;
`;

const ErrorMessage = styled.div`
  font-size: 40px;
  margin-bottom: 40px;
`;

export default function SetProfile() {
  const navigate = useNavigate();
  return (
    <TopDiv>
      <ErrorImg src={error404} />
      <ErrorMessage>요청하신 페이지를 찾을 수 없습니다.</ErrorMessage>
      <ColorButton onClick={() => navigate(-1)}>돌아가기</ColorButton>
    </TopDiv>
  );
}
