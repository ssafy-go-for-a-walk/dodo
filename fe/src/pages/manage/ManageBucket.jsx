import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";
import CompleteButton from "../../components/common/button/CompleteButton";
import Modal from "react-modal";
import DetailModalStyle from "../../components/common/modal/detailBucket/DetailModalStyle";
import DetailModal from "../../components/common/modal/detailBucket/DetailModal";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reBucketList, changeCompleteRate } from "../../redux/user";
import { useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

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
  background: ${props => (props.complete ? "#E9F5FF" : "#ffffff")};
  position: absolute;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  z-index: 1;
  cursor: pointer;
  transition: all 0.3s ease-out;
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
  width: calc(70vw - 380px);
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
  const { user } = useSelector(state => state);
  const userToken = user.value.token;
  const signal = props.signal;
  const [activateDelete, setActivateDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [complete, setComplete] = useState(bucket.complete);
  const dispatch = useDispatch();

  const openDetailModal = () => {
    setIsOpen(true);
    setActivateDelete(false);
    lockScroll();
  };

  const closeModal = () => {
    setIsOpen(false);
    openScroll();
  };

  const lockScroll = useCallback(() => {
    const scrollPosition = window.pageYOffset;
    document.body.style.overflow = "scroll";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
  }, []);

  const openScroll = useCallback(() => {
    const scrollPosition = window.pageYOffset;
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    window.scrollTo(0, scrollPosition);
  }, []);

  const deleteBucket = () => {
    if (activateDelete) {
      axios
        .delete(`https://j8b104.p.ssafy.io/api/buckets/${bucket.seq}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          const resData = res.data.data;
          dispatch(reBucketList(resData.buckets));
          dispatch(changeCompleteRate(resData.completeRate));
        });
    } else {
      setActivateDelete(true);
    }
  };
  useEffect(() => {
    if (signal) {
      props.sendSignal();
    }
  }, [signal, props]);

  const changeComplete = () => {
    setComplete(bool => !bool);
  };

  return (
    <BucketBox>
      <BucketInfo activate={activateDelete} complete={complete} onClick={openDetailModal}>
        <BucketHeader>
          <Tag category={bucket.category !== null ? bucket.category.item : null} />
          <BucketEmoji role="img">{bucket.emoji}</BucketEmoji>
          {bucket.title.length > 36 ? (
            <Tooltip title={bucket.title} placement="bottom-start" arrow>
              <BucketTitle activate={activateDelete}>{bucket.title}</BucketTitle>
            </Tooltip>
          ) : (
            <BucketTitle activate={activateDelete}>{bucket.title}</BucketTitle>
          )}
        </BucketHeader>
        <CompleteButton complete={complete} bucketId={bucket.seq} changeComplete={changeComplete} />
      </BucketInfo>
      <DeleteBox onClick={deleteBucket} onMouseEnter={() => setActivateDelete(true)} onMouseLeave={() => setActivateDelete(false)}>
        <DeleteBtn>삭제</DeleteBtn>
      </DeleteBox>
      <Modal isOpen={isOpen} onRequestClose={closeModal} style={DetailModalStyle} ariaHideApp={false}>
        <DetailModal closeModal={closeModal} bucket={bucket} />
      </Modal>
    </BucketBox>
  );
}
