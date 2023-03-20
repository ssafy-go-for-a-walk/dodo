import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 530px;
  height: 67px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1c9bff;
  background-color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  border: 1px solid #1c9bff;
  cursor: pointer;
`;

export default function ColorButton(props) {
  return <ButtonBox onClick={props.onClick}>{props.children}</ButtonBox>;
}
