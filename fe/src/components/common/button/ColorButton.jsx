import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 530px;
  height: 67px;
  border-radius: 16px;
  border: none;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1c9bff;
  color: #ffffff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    box-shadow: none;
    background: rgba(28, 155, 255, 0.75);
  }
`;

export default function ColorButton(props) {
  return <ButtonBox onClick={props.onClick}>{props.children}</ButtonBox>;
}
