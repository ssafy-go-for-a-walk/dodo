import React from "react";
import styled from "styled-components";

const ButtonBox = styled.button`
  width: 64px;
  height: 32px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.isComplete ? "#1c9bff" : "#E9F5FF")};
  color: ${props => (props.isComplete ? "#ffffff" : "#000000")};
  font-size: 14px;
  cursor: pointer;
`;

export default function CompleteButton(props) {
  const { isComplete, bucketId } = props;
  const completeBucket = event => {
    event.preventDefault();
    props.propFunction(bucketId);
  };

  return (
    <ButtonBox isComplete={isComplete} onClick={completeBucket}>
      {isComplete ? "완료" : "미완"}
    </ButtonBox>
  );
}
