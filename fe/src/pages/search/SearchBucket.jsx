import React from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";

const BucketBox = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border-bottom: 1px solid #bcbcbc;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

const BucketEmoji = styled.span`
  font-size: 24px;
  margin: 0 8px;
`;

const BucketTitle = styled.div`
  max-width: 90%;
  font-size: 16px;
  padding: 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function SearchBucket(props) {
  const bucket = props.bucket;

  return (
    <BucketBox>
      <Tag category={bucket.category !== null ? bucket.category.item : null} disabled="disabled" />
      <BucketEmoji role="img">{bucket.emoji}</BucketEmoji>
      <BucketTitle disabled="disabled">{bucket.title}</BucketTitle>
    </BucketBox>
  );
}
