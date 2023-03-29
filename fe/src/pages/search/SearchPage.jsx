import React, { useState } from "react";
import styled from "styled-components";
import SlideUp from "../../components/common/button/SlideUp";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import SearchBucket from "./SearchBucket";
import Category from "./Category";
import cate from "../../configs/categoryConfig";

const bucketList = [
  {
    id: 1,
    title: "세계 여행하기",
    category: "여행",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 2,
    title: "점심 먹기sasssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss",
    category: "푸드",
    challengers: 2,
    isAdd: false,
    imoge: "",
  },
  {
    id: 3,
    title: "점심 먹기",
    category: "일상",
    challengers: 100,
    isAdd: true,
    imoge: "",
  },
  {
    id: 4,
    title: "점심 먹기",
    category: "대자연",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 5,
    title: "점심 먹기",
    category: "쇼핑",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 6,
    title: "점심 먹기",
    category: "문화예술",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 7,
    title: "점심 먹기",
    category: "자기계발",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 8,
    title: "점심 먹기",
    category: "아웃도어",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 9,
    title: "점심 먹기",
    category: "스포츠",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
];

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categorys = styled.div`
  width: 708px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export default function SearchPage() {
  const [selectCate, setSelectCate] = useState("전체");

  const changeCate = categoryName => {
    setSelectCate(categoryName);
  };

  return (
    <Div>
      <SearchBar />
      <Categorys>
        {cate.map(data => (
          <Category
            select={data.name === selectCate ? true : false}
            categoryName={data.name}
            categoryImg={data.image}
            key={data.name}
            propFunction={changeCate}
          />
        ))}
      </Categorys>
      <Banner />
      {bucketList.map(bucket => {
        if (selectCate === "전체" || selectCate === bucket.category) {
          return <SearchBucket bucket={bucket} key={bucket.id} />;
        }
      })}
      <SlideUp />
    </Div>
  );
}
