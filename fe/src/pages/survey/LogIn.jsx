import React from "react";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  height: 35px;
  margin-top: 16px;
`

const LogInButton = styled.button`
  border: none;
  background: rgba(28, 155, 255, 0.2);
  width: 80px;
  height: 35px;
  font-weight: 700;
  border-radius: 8px;
  font-size: 14px;
  margin: 0 16px 0 16px;
  float: right;
  &:hover {
    cursor: pointer;
  }
`;

export default function LogIn() {
  return (
    <Div>
      <p>✨ 이미 가입하셨나요?</p>
      <LogInButton onClick={() => window.location.replace("https://j8b104.p.ssafy.io/api/oauth2/authorization/kakao", "_blank")}>로그인</LogInButton>
    </Div>
  )
}
