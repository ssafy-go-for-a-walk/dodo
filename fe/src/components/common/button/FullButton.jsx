import React from "react";
import styled from "styled-components";
import { MdContentCopy } from "react-icons/md";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

const ButtonBox = styled.button`
  width: 80%;
  max-width: 530px;
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
  margin-bottom: 24px;
  &:hover {
    box-shadow: none;
  }

  .icon {
    font-size: 32px;
    color: #1c9bff;
    margin-left: 16px;
  }
`;

export default function ColorButton(props) {
  const content = props.children;
  const clickBtn = event => {
    event.preventDefault();
    props.propFunction(content);
  };
  return (
    <ButtonBox onClick={clickBtn}>
      {content}
      {content === "Private / Public" && (props.public ? <BsToggleOn className="icon" /> : <BsToggleOff className="icon" />)}
      {content === "참여코드 생성하기" && <MdContentCopy className="icon" />}
    </ButtonBox>
  );
}
