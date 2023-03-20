import React from "react";
import styled from "styled-components";

const UpButton = styled.div`
  position: fixed;
  bottom: 16px;
  right: 72px;
  width: 50px;
  height: 50px;
`;

export default function SlideUp(props) {
  const { onClick } = props;

  return <UpButton onClick={onClick}></UpButton>;
}
