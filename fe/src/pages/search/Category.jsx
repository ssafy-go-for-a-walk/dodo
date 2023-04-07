import React from "react";
import styled from "styled-components";

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: #1c9bff;
    transform: scale(1.08);
  }
`;

const CategoryImg = styled.img`
  width: 32px;
  height: 32px;
  margin-bottom: 8px;
`;

const CategoryName = styled.div`
  font-size: 12px;
  font-weight: ${props => props.select && "bold"};
  color: ${props => props.select && "#1C9BFF"};
`;

export default function Category(props) {
  const { categoryName, categoryImg, select } = props;

  const changeCategory = event => {
    event.preventDefault();
    props.propFunction(categoryName);
  };

  return (
    <CategoryBox onClick={changeCategory}>
      <CategoryImg src={categoryImg} />
      <CategoryName select={select}>{categoryName}</CategoryName>
    </CategoryBox>
  );
}
