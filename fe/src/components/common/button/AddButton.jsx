import React from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";

const ButtonBox = styled.button`
  min-width: 64px;
  height: 32px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.isAdd ? "#F1F3F5" : "#E9F5FF")};
  font-size: 14px;
  cursor: pointer;

  .checkIcon {
    color: #1c9bff;
    font-size: 32px;
  }
`;

export default function AddButton(props) {
  const { isAdd, bucketId } = props;
  const addBucket = event => {
    event.preventDefault();
    props.propFunction(bucketId);
  };

  return (
    <ButtonBox isAdd={isAdd} onClick={addBucket} disabled={isAdd && "disabled"}>
      {isAdd ? <MdCheck className="checkIcon" /> : "담기"}
    </ButtonBox>
  );
}
