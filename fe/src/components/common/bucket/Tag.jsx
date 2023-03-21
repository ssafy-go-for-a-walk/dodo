import React from "react";
import styled from "styled-components";

const TagBox = styled.div`
  width: 56px;
  height: 32px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 16px;
  background: ${props => {
    const tag = props.tagName;
    if (tag === "대자연") {
      return "#A5E887";
    } else if (tag === "일상") {
      return "#F8EBCC";
    } else if (tag === "쇼핑") {
      return "#F7B030";
    } else if (tag === "여행") {
      return "#62A4FB";
    } else if (tag === "문화예술") {
      return "#EAAE8E";
    } else if (tag === "자기계발") {
      return "#D4D9FF";
    } else if (tag === "푸드") {
      return "#FEDF74";
    } else if (tag === "아웃도어") {
      return "#24AE5F";
    } else if (tag === "스포츠") {
      return "#FF8D5C";
    }
  }};
`;

export default function Tag(props) {
  const { tagName } = props;

  return <TagBox tagName={tagName}>{tagName}</TagBox>;
}
