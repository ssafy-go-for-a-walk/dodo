import React from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";
import AddButton from "../../components/common/button/AddButton";

const BucketBox = styled.div`
  width: 100%;
  height: 64px;
  border-radius: 8px;
  border-bottom: 1px solid #bcbcbc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
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

export default function SearchBucket(props) {
  const bucket = props.bucket;

  return (
    <BucketBox>
      <BucketInfo>
        <BucketHeader>
          <Tag category={bucket.category} />
          <BucketEmoji role="img">{bucket.emoji}</BucketEmoji>
          <BucketTitle>{bucket.title}</BucketTitle>
        </BucketHeader>
        <BucketChallenger>현재 {bucket.added_count}명이 도전중</BucketChallenger>
      </BucketInfo>
      <AddButton bucketId={bucket.seq} />
    </BucketBox>
  );
}
