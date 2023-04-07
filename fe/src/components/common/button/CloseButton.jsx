import React from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";

const Close = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  cursor: pointer;

  .closeIcon {
    color: #1c9bff;
    font-size: 32px;
  }
`;

export default function CloseButton(props) {
  const { onClick } = props;

  return (
    <Close onClick={onClick}>
      <MdClose className="closeIcon" />
    </Close>
  );
}
