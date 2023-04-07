import React from "react";
import styled from "styled-components";
import ManageBucket from "./ManageBucket";

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
    imoge: "",
  },
  {
    id: 2,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    imoge: "",
  },
  {
    id: 3,
    title: "점심 먹기",
    category: "푸드",
    isComplete: true,
    imoge: "",
  },
  {
    id: 4,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    imoge: "",
  },
  {
    id: 5,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    imoge: "",
  },
  {
    id: 6,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    imoge: "",
  },
  {
    id: 7,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    imoge: "",
  },
  {
    id: 8,
    title: "점심 먹기",
    category: "푸드",
    isComplete: false,
    imoge: "",
  },
];

export default function ManageBucketList() {
  return (
    <BucketList>
      {myBuckets.map(bucket => (
        <ManageBucket bucket={bucket} key={bucket.id} />
      ))}
    </BucketList>
  );
}
