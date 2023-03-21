import React from "react";
import styled from "styled-components";
import { IoIosArrowDropupCircle } from "react-icons/io";

const UpButton = styled.div`
  position: fixed;
  bottom: 16px;
  right: 72px;
  cursor: pointer;

  .upIcon {
    color: #1c9bff;
    font-size: 50px;
  }
`;
export default function SlideUp(props) {
  const { onClick } = props;

  return (
    <UpButton onClick={onClick}>
      <IoIosArrowDropupCircle className="upIcon" />
    </UpButton>
  );
}
