import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${props => props.background && "rgba(28, 155, 255, 0.2)"};
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  border-radius: 16px;
  font-size: 16px;
  border: none;
  padding: 16px 32px;
  &:hover {
    box-shadow: none;
    cursor: pointer;
  }
`;

const Div = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export default function Survey(props) {
  const content = props.content;
  const id = props.id;
  const background = props.select;
  const clickItem = event => {
    event.preventDefault();
    props.propFunction(id);
  };
  return (
    <Div>
      <Button background={background} onClick={clickItem}>
        {content}
      </Button>
    </Div>
  );
}
