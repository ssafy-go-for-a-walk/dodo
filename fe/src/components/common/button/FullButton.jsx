import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 530px;
  height: 67px;
  border-radius: 16px;
  border: 1px solid #1c9bff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1c9bff;
  background: #ffffff;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: none;
  }
`;

export default function ColorButton(props) {
  return <ButtonBox onClick={props.onClick}>{props.children}</ButtonBox>;
}
