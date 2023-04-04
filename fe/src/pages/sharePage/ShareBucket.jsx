import React from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";

const BucketBox = styled.div`
  width: 80%;
  max-width: 800px;
  height: 64px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  background: ${props => (props.complete ? "#E9F5FF" : "#ffffff")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  position: relative;
  margin-bottom: 24px;
`;

const BucketHeader = styled.div`
  width: 90%;
  display: flex;
  align-items: center;

  @media screen and (max-width: 940px) {
    width: 85%;
  }

  @media screen and (max-width: 662px) {
    width: 80%;
  }
`;

const BucketEmoji = styled.span`
  font-size: 24px;
  margin: 0 8px;
`;

const BucketTitle = styled.div`
  max-width: 80%;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BucketComplete = styled.div`
  min-width: 64px;
  height: 32px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.complete ? "#1c9bff" : "#E9F5FF")};
  color: ${props => (props.complete ? "#ffffff" : "#000000")};
  font-size: 14px;
`;

export default function ShareBucket(props) {
  const bucket = props.bucket;
  return (
    <BucketBox complete={bucket.complete}>
      <BucketHeader>
        <Tag category={bucket.category !== null ? bucket.category.item : null} />
        <BucketEmoji role="img">{bucket.emoji}</BucketEmoji>
        <BucketTitle>{bucket.title}</BucketTitle>
      </BucketHeader>
      <BucketComplete complete={bucket.complete}>{bucket.complete ? "완료" : "미완"}</BucketComplete>
    </BucketBox>
  );
}
