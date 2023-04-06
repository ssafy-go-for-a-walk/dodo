import React from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";
import AddButton from "../../components/common/button/AddButton";
import Tooltip from "@mui/material/Tooltip";

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
  cursor: default;

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

export default function RecommBucket(props) {
  const bucket = props.bucket;

  return (
    <BucketBox>
      <BucketInfo>
        <BucketHeader>
          <Tag category={bucket.category.item} />
          <BucketEmoji role="img">{bucket.emoji}</BucketEmoji>
          {bucket.title.length > 36 ? (
            <Tooltip title={bucket.title} placement="bottom-start" arrow>
              <BucketTitle>{bucket.title}</BucketTitle>
            </Tooltip>
          ) : (
            <BucketTitle>{bucket.title}</BucketTitle>
          )}
        </BucketHeader>
        <BucketChallenger>현재 {bucket.addedCount}명이 도전중</BucketChallenger>
      </BucketInfo>
      <AddButton bucket={bucket} />
    </BucketBox>
  );
}
