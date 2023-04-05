import React from "react";
import { useNavigate } from "react-router-dom";
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
  background-color: ${props => props.color};
`;

export default function SelectedButton(props) {
  const navigate = useNavigate();
  const innerText = props.text;
  return (
    <Div
      color={innerText === "선택됨" ? "#D9D9D9" : "#1C9BFF"}
      onClick={() => {
        if (innerText === "수정") {
          navigate("/manage");
        }
      }}
    >
      {innerText}
    </Div>
  );
}
