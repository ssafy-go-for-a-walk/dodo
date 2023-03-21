import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 44px;
  height: 22px;
  border-radius: 16px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1c9bff;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
`;

export default function SelectButton(props) {
  return <ButtonBox onClick={props.onClick}>{props.children}</ButtonBox>;
}
