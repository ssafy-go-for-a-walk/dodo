import React from "react";
import styled from "styled-components";

const Back = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
`;

export default function Backdrop(props) {
  const { onClick } = props;

  return <Back onClick={onClick} />;
}
