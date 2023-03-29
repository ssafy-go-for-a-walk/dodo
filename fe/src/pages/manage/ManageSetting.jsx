import React, { useState } from "react";
import styled from "styled-components";
import FullButton from "../../components/common/button/FullButton";
import HalfButton from "../../components/common/button/HalfButton";
import DeleteButton from "../../components/common/button/DeleteButton";

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const BucketImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50px;
`;

const BucketTitle = styled.div`
  width: 80%;
  max-width: 528px;
  height: 32px;
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
`;

const TitleLadel = styled.label`
  width: 72px;
  text-align: center;
  font-size: 24px;
  color: #868e96;
  margin-right: 16px;
`;

const TitleInput = styled.input`
  width: 440px;
  font-size: 24px;
  border: none;
  border-bottom: 1px solid #ced4da;
  text-align: center;
`;

const HalfButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 528px;
`;

export default function ManageSetting(props) {
  const { bucketListTitle, isPublic, bucketListImg } = props;
  const [value, setValue] = useState("죽기전에 해야 할 100가지 버킷리스트");
  const handleInputChange = event => {
    setValue(event.target.value);
  };
  const saveSetting = () => {
    return;
  };
  const changePublic = () => {
    return;
  };
  const createCode = () => {
    return;
  };
  return (
    <Settings>
      <BucketImg src="https://images.pexels.com/photos/177809/pexels-photo-177809.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" />
      {/* <BucketImg src={bucketListImg} /> */}
      <BucketTitle>
        <TitleLadel>제목</TitleLadel>
        <TitleInput value={value} onChange={handleInputChange} />
      </BucketTitle>
      <FullButton propFunction={saveSetting}>저장하기</FullButton>
      <FullButton public={isPublic} propFunction={changePublic}>
        Private / Public
      </FullButton>
      <FullButton propFunction={createCode}>참여코드 생성하기</FullButton>
      <HalfButtons>
        <HalfButton>공유하기</HalfButton>
        <HalfButton>내보내기</HalfButton>
      </HalfButtons>
      <DeleteButton />
    </Settings>
  );
}
