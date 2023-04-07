import React from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";
import SearchAddButton from "../../components/common/button/SearchAddButton";

const BucketBox = styled.div`
  width: 100%;
  height: 48px;
  border-radius: 8px;
  border-bottom: 1px solid #bcbcbc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px;
`;

const BucketInfo = styled.div`
  width: 85%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 856px) {
    width: 85%;
  }
`;

const BucketEmoji = styled.div`
  font-size: 20px;
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
      <BucketInfo>
        <Tag category={bucket.category !== null ? bucket.category.item : null} />
        <BucketEmoji role="img">{bucket.emoji}</BucketEmoji>
        <BucketTitle>{bucket.title}</BucketTitle>
      </BucketInfo>
      <SearchAddButton bucket={bucket} />
    </BucketBox>
  );
}
