import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 44px;
  height: 22px;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  background-color: #1c9bff;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
`;

export default function SelectButton(props) {
  return <ButtonBox onClick={props.onClick}>{props.children}</ButtonBox>;
}
