import React, { useState } from "react";
import styled from "styled-components";
import Tag from "../common/bucket/Tag";
import CompleteButton from "../common/button/CompleteButton";

const BucketBox = styled.div`
  width: 800px;
  height: 68px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  position: relative;
  margin-bottom: 24px;
`;

const BucketInfo = styled.div`
  width: ${props => (props.activate ? "688px" : "752px")};
  height: 52px;
  border-radius: 8px;
  background: ${props => (props.isComplete ? "#E9F5FF" : "#ffffff")};
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  z-index: 1;
`;

const BucketHeader = styled.div`
  max-width: 688px;
  height: 32px;
  display: flex;
  align-items: center;
  font-size: 16px;
`;

const BucketImoge = styled.div`
  width: 32px;
  margin: 0 8px;
`;

const BucketTitle = styled.div`
  font-size: 16px;
  padding: 8px 0;
`;

const DeleteBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  background: #ff6666;
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const DeleteBtn = styled.button`
  width: 48px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 16px;
  color: #ffffff;
  font-size: 16px;
`;

export default function Bucket(props) {
  const bucket = props.bucket;
  const [activateDelete, setActivateDelete] = useState(false);

  const openDetailModal = () => {
    console.log("open");
  };

  const activateBtn = () => {
    setActivateDelete(!activateDelete);
  };

  const deleteBucket = event => {
    if (event.stopPropagation) {
      event.stopPropagation();
    }
    event.cancelBubble = true;
    console.log("delete");
  };

  return (
    <BucketBox>
      <BucketInfo activate={activateDelete} isComplete={bucket.isComplete} onClick={openDetailModal}>
        <BucketHeader>
          <Tag tagName={bucket.category} />
          <BucketImoge />
          <BucketTitle>{bucket.title}</BucketTitle>
        </BucketHeader>
        <CompleteButton isComplete={bucket.isComplete} bucketId={bucket.id} />
      </BucketInfo>
      <DeleteBox onClick={activateBtn}>
        <DeleteBtn conClick={deleteBucket}>삭제</DeleteBtn>
      </DeleteBox>
    </BucketBox>
  );
}
