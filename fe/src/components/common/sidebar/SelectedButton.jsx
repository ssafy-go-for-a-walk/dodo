import React from "react";
import styled from "styled-components";

const Div = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  width: 70px;
  height: 30px;
  color: white;
  margin-right: 8px;
  background-color: #1C9BFF;
`;

export default function SelectedButton() {
  return (
    <Div>선택됨</Div>
  );
}
