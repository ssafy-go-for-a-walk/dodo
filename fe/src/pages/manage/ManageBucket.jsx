import React, { useState } from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";
import CompleteButton from "../../components/common/button/CompleteButton";
import Modal from "react-modal";
import DetailModalStyle from "../../components/common/modal/DetailModalStyle";
import DetailModal from "../../components/common/modal/detailBucket/DetailModal";

const BucketBox = styled.div`
  width: 80%;
  max-width: 800px;
  height: 72px;
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  position: relative;
  margin-bottom: 24px;
`;

const BucketInfo = styled.div`
  width: ${props => (props.activate ? "89%" : "98%")};
  height: 100%;
  border-radius: 8px;
  background: ${props => (props.isComplete ? "#E9F5FF" : "#ffffff")};
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  z-index: 1;
  cursor: pointer;
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

const DeleteBtn = styled.div`
  margin-right: 3%;
  color: #ffffff;
  font-size: 16px;

  @media screen and (max-width: 576px) {
    width: 16px;
  }
`;

export default function Bucket(props) {
  const bucket = props.bucket;
  const [activateDelete, setActivateDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const openDetailModal = () => {
    setIsOpen(true);
    setActivateDelete(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const deleteBucket = () => {
    if (activateDelete) {
      console.log("delete");
    } else {
      setActivateDelete(true);
    }
  };

  return (
    <BucketBox>
      <BucketInfo activate={activateDelete} isComplete={bucket.isComplete} onClick={openDetailModal}>
        <BucketHeader>
          <Tag category={bucket.category} />
          <BucketEmoji role="img">{bucket.emoji}</BucketEmoji>
          <BucketTitle activate={activateDelete}>{bucket.title}</BucketTitle>
        </BucketHeader>
        <CompleteButton isComplete={bucket.isComplete} bucketId={bucket.id} />
      </BucketInfo>
      <DeleteBox onClick={deleteBucket}>
        <DeleteBtn>삭제</DeleteBtn>
      </DeleteBox>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={DetailModalStyle} ariaHideApp={false}>
        <DetailModal closeModal={closeModal} bucket={bucket} />
      </Modal>
    </BucketBox>
  );
}
