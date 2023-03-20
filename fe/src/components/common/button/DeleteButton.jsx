import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 530px;
  height: 67px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ff6666;
  background-color: #ffffff;
  color: #ff6666;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

export default function DeleteButton(props) {
  return <ButtonBox onClick={props.onClick}>삭제하기</ButtonBox>;
}
