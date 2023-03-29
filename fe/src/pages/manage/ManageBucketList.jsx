import React, { useState } from "react";
import styled from "styled-components";
import ManageBucket from "./ManageBucket";
import Filter from "./Filter";

const BucketList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const myBuckets = [
  {
    id: 1,
    title: "세계 여행하기",
    category: "여행",
    isComplete: false,
    emoji: "",
    location: "해운대",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 2,
    title: "점심 먹기zcxcccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc",
    category: "자기계발",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 3,
    title: "점심 먹기",
    category: "푸드",
    isComplete: true,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 4,
    title: "점심 먹기",
    category: null,
    isComplete: false,
    emoji: "",
    location: "",
    desc: "",
  },
  {
    id: 5,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 6,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 7,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 9,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 10,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 11,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 12,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 13,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 14,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
  {
    id: 15,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    emoji: "",
    location: "싸피",
    desc: "sdsadsadadsadasdasdasdsadasdasdas",
  },
];

export default function ManageBucketList() {
  const [bucketFilter, setBucketFilter] = useState("전체");
  const changeBucketFilter = fil => {
    setBucketFilter(fil);
  };

  return (
    <BucketList>
      <Filter bucketFilter={bucketFilter} propFunction={changeBucketFilter} />
      {bucketFilter === "전체" && myBuckets.map(bucket => <ManageBucket bucket={bucket} key={bucket.id} />)}
      {bucketFilter === "완료" && myBuckets.filter(bucket => bucket.isComplete === true).map(bucket => <ManageBucket bucket={bucket} key={bucket.id} />)}
      {bucketFilter === "미완" && myBuckets.filter(bucket => bucket.isComplete === false).map(bucket => <ManageBucket bucket={bucket} key={bucket.id} />)}
    </BucketList>
  );
}
