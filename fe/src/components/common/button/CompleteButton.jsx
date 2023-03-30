import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  min-width: 64px;
  height: 32px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.complete ? "#1c9bff" : "#E9F5FF")};
  color: ${props => (props.complete ? "#ffffff" : "#000000")};
  font-size: 14px;
  cursor: pointer;
`;

export default function CompleteButton(props) {
  const { complete, bucketId } = props;
  const completeBucket = event => {
    event.stopPropagation();
    event.preventDefault();
    console.log("complete");
  };

  return (
    <ButtonBox complete={complete} onClick={completeBucket}>
      {complete ? "완료" : "미완"}
    </ButtonBox>
  );
}
