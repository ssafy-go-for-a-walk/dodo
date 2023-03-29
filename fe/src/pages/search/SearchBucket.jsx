import React from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";
import AddButton from "../../components/common/button/AddButton";

const BucketBox = styled.div`
  width: 80%;
  max-width: 800px;
  height: 80px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  margin-bottom: 24px;
`;

const BucketInfo = styled.div`
  width: 90%;

  @media screen and (max-width: 856px) {
    width: 85%;
  }
`;

const BucketHeader = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 16px;
  margin-bottom: 4px;
`;

const BucketEmoji = styled.div`
  font-size: 24px;
  margin: 0 8px;
`;

const BucketTitle = styled.div`
  max-width: 80%;
  font-size: 16px;
  padding: 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
          <Tag category={bucket.category} />
          <BucketEmoji role="img" aria-label="writing hand">
            {bucket.emoji}
          </BucketEmoji>
          <BucketTitle>{bucket.title}</BucketTitle>
        </BucketHeader>
        <BucketChallenger>현재 {bucket.challengers}명이 도전중</BucketChallenger>
      </BucketInfo>
      <AddButton isAdd={bucket.isAdd} bucketId={bucket.id} />
    </BucketBox>
  );
}
