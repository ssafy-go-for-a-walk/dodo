import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 530px;
  height: 67px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1c9bff;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  border: 0;
  cursor: pointer;
`;

export default function ColorButton(props) {
  return <ButtonBox onClick={props.onClick}>{props.children}</ButtonBox>;
}
