import React from "react";
import styled from "styled-components";
import allImg from "../../assets/images/all.png";
import natureImg from "../../assets/images/nature.png";
import dailyImg from "../../assets/images/daily.png";
import shoppingImg from "../../assets/images/shopping.png";
import travelImg from "../../assets/images/travel.png";
import artImg from "../../assets/images/art.png";
import developmentImg from "../../assets/images/development.png";
import foodImg from "../../assets/images/food.png";
import outdoorImg from "../../assets/images/outdoor.png";
import sportsImg from "../../assets/images/sports.png";

const CategoryBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

  &: hover {
    font-weight: bold;
    color: #1c9bff;
  }
`;

export default function Category(props) {
  const { categoryName, select } = props;

  const categoryImg = () => {
    if (categoryName === "전체") {
      return allImg;
    } else if (categoryName === "대자연") {
      return natureImg;
    } else if (categoryName === "일상") {
      return dailyImg;
    } else if (categoryName === "쇼핑") {
      return shoppingImg;
    } else if (categoryName === "여행") {
      return travelImg;
    } else if (categoryName === "문화예술") {
      return artImg;
    } else if (categoryName === "자기계발") {
      return developmentImg;
    } else if (categoryName === "푸드") {
      return foodImg;
    } else if (categoryName === "아웃도어") {
      return outdoorImg;
    } else if (categoryName === "스포츠") {
      return sportsImg;
    }
  };

  return (
    <CategoryBox>
      <CategoryImg src={categoryImg()} />
      <CategoryName select={select}>{categoryName}</CategoryName>
    </CategoryBox>
  );
}
