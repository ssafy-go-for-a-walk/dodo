import React from "react";
import styled from "styled-components";
import color from "../../configs/cateConfigs";

const Cate = styled.div`
  display: flex;
  color: white;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  width: 80px;
  height: 40px;
  margin-right: 16px;
`;

export default function Category(props) {
  const category = props.category;
  const bgColor = color[category];
  return <Cate style={{ backgroundColor: `${bgColor}` }}>{category}</Cate>;
}
