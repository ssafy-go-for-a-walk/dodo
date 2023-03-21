import React from "react";
import styled from "styled-components";
// import CodeModal from "../components/common/modal/CodeModal";
// import Backdrop from "../components/common/modal/Backdrop";
// import GroupModal from "../components/common/modal/GroupModal";
import SlideUp from "../components/common/button/SlideUp";
import SearchBar from "../components/search/SearchBar";
import Banner from "../components/search/Banner";
import Bucket from "../components/search/Bucket";
import Category from "../components/search/Category";

const categoryList = [
  {
    categoryName: "전체",
    select: true,
  },
  {
    categoryName: "대자연",
    select: false,
  },
  {
    categoryName: "일상",
    select: false,
  },
  {
    categoryName: "쇼핑",
    select: false,
  },
  {
    categoryName: "여행",
    select: false,
  },
  {
    categoryName: "문화예술",
    select: false,
  },
  {
    categoryName: "자기계발",
    select: false,
  },
  {
    categoryName: "푸드",
    select: false,
  },
  {
    categoryName: "아웃도어",
    select: false,
  },
  {
    categoryName: "스포츠",
    select: false,
  },
];

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
    title: "점심 먹기",
    category: "푸드",
    challengers: 2,
    isAdd: false,
    imoge: "",
  },
  {
    id: 3,
    title: "점심 먹기",
    category: "푸드",
    challengers: 100,
    isAdd: true,
    imoge: "",
  },
  {
    id: 4,
    title: "점심 먹기",
    category: "푸드",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 5,
    title: "점심 먹기",
    category: "푸드",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 6,
    title: "점심 먹기",
    category: "푸드",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 7,
    title: "점심 먹기",
    category: "푸드",
    challengers: 10,
    isAdd: false,
    imoge: "",
  },
  {
    id: 8,
    title: "점심 먹기",
    category: "푸드",
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

const Buckets = styled.div`
  display: flex;
  flex-direction: column;
  jutify-content: center;
  margin-top: 24px;
`;

export default function SearchPage() {
  return (
    <Div>
      <SearchBar />
      <Categorys>
        {categoryList.map(data => (
          <Category select={data.select} categoryName={data.categoryName} key={data.categoryName} />
        ))}
      </Categorys>
      <Banner />
      <Buckets>
        {bucketList.map(bucket => (
          <Bucket bucket={bucket} key={bucket.id} />
        ))}
      </Buckets>
      <SlideUp />
    </Div>
  );
}
