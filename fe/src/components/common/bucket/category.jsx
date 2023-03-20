import React from "react";
import styled from "styled-components";

const Category = styled.button`
  width: 64px;
  height: 24px;
  border-radius: 8px;
  text-align: center;
  border: 0;
  color: #ffffff;
  font-size: 16px;
  background-color: ${props => {
    const category = props.children;
    if (category === "대자연") {
      return "#A5E887";
    } else if (category === "일상") {
      return "#F8EBCC";
    } else if (category === "쇼핑") {
      return "#F7B030";
    } else if (category === "여행") {
      return "#62A4FB";
    } else if (category === "문화예술") {
      return "#EAAE8E";
    } else if (category === "자기계발") {
      return "#D4D9FF";
    } else if (category === "푸드") {
      return "#FEDF74";
    } else if (category === "아웃도어") {
      return "#24AE5F";
    } else if (category === "스포츠") {
      return "#FF8D5C";
    }
  }};
`;

export default function SelectButton(props) {
  return <Category onClick={props.onClick} />;
}
