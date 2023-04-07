import React from "react";
import styled from "styled-components";
import { MdShare } from "react-icons/md";
import { TbShare2 } from "react-icons/tb";

const ButtonBox = styled.button`
  width: 50%;
  max-width: 190px;
  height: 56px;
  border-radius: 16px;
  border: 1px solid #1c9bff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1c9bff;
  background: #ffffff;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 24px;
  &:hover {
    box-shadow: none;
  }

  .icon {
    font-size: 24px;
    color: #1c9bff;
    margin-right: 16px;
  }
`;

export default function ColorButton(props) {
  const content = props.children;
  return (
    <ButtonBox onClick={props.onClick}>
      {content === "공유하기" ? <MdShare className="icon" /> : <TbShare2 className="icon" />}
      {content}
    </ButtonBox>
  );
}
