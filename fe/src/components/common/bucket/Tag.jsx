import React from "react";
import styled from "styled-components";
import color from "../../../configs/cateConfigs";

const Cate = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  min-width: 64px;
  height: 32px;
  font-size: 14px;
`;

export default function Category(props) {
  const category = props.category;
  const bgColor = color[`${category}`];
  return <Cate style={{ backgroundColor: `${bgColor}` }}>{category !== null ? category : "기타"}</Cate>;
}
