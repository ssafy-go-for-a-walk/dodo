import React from "react";
import styled from "styled-components";
import Tag from "../common/bucket/Tag";
import AddButton from "../common/button/AddButton";

const BucketBox = styled.div`
  width: 768px;
  height: 52px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 24px;
`;

const BucketInfo = styled.div`
  width: 688px;
`;

const BucketHeader = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 4px;
`;

const BucketImoge = styled.div`
  width: 32px;
  margin: 0 8px;
`;

const BucketTitle = styled.div`
  font-size: 16px;
  padding: 8px 0;
`;

const BucketChallenger = styled.div`
  font-size: 14px;
  color: #797979;
`;

export default function Bucket(props) {
  const bucket = props.bucket;

  return (
    <BucketBox>
      <BucketInfo>
        <BucketHeader>
          <Tag tagName={bucket.category} />
          <BucketImoge />
          <BucketTitle>{bucket.title}</BucketTitle>
        </BucketHeader>
        <BucketChallenger>현재 {bucket.challengers}명이 도전중</BucketChallenger>
      </BucketInfo>
      <AddButton isAdd={bucket.isAdd} bucketId={bucket.id} />
    </BucketBox>
  );
}
