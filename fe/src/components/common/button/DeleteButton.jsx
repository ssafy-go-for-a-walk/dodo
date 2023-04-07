import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 80%;
  max-width: 400px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid #ff6666;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffffff;
  color: #ff6666;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 40px;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: none;
  }
`;

export default function DeleteButton(props) {
  return <ButtonBox onClick={props.onClick}>삭제하기</ButtonBox>;
}
