import React from "react";
import styled from "styled-components";
import FullButton from "../common/button/FullButton";
import HalfButton from "../common/button/HalfButton";
import DeleteButton from "../common/button/DeleteButton";

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BucketImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50px;
`;

const BucketTitle = styled.div``;

const HalfButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 528px;
`;

export default function ManageSetting(props) {
  return (
    <Settings>
      <BucketImg />
      <BucketTitle title={props.title} />
      <FullButton>저장하기</FullButton>
      <FullButton>Private / Public</FullButton>
      <FullButton>참여코드 생성하기</FullButton>
      <HalfButtons>
        <HalfButton>공유하기</HalfButton>
        <HalfButton>내보내기</HalfButton>
      </HalfButtons>
      <DeleteButton />
    </Settings>
  );
}
