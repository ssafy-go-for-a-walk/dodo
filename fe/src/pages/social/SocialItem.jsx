import React, { useState } from "react";
import styled from "styled-components";
import SocialItemContent from "./SocialItemContent";
import ButtonArrow from "./ButtonArrow";

const TopDiv = styled.div`
  display: inline-block;
  background-color: white;
  width: 480px;
  border-radius: 8px;
  margin-bottom: 40px;
  box-shadow: 0px 4px 4px 0px #00000040;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 16px 0px 16px;
`;

const BuckitlistImg = styled.img`
  height: 56px;
  width: 56px;
  border-radius: 8px;
`;

const SubDiv = styled.div`
  display: inline-block;
  margin-left: 16px;
`;

const BuckitlistName = styled.p`
  margin: 0px;
`;

const UserDiv = styled.div`
  display: flex;
  align-items: center;
`;

const UserImg = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 100px;
`;

const UserNickNAME = styled.p`
  margin: 0px;
  margin-left: 8px;
`;

export default function SocialItem(props) {
  const [buttonStatus, setButtonStatus] = useState(true);
  const info = props.data;
  const length = 6;
  const [datas, setdatas] = useState(info.buckets);
  const resDatas = info.buckets.slice(length);
  const clickEvent = () => {
    setButtonStatus(pre => !pre);
    setdatas(pre => [...pre, ...resDatas]);
  };

  return (
    <TopDiv>
      <TitleDiv>
        <BuckitlistImg src={info.bucketlist.image} alt="#" />
        <SubDiv>
          <BuckitlistName>{info.bucketlist.title}</BuckitlistName>
          <UserDiv>
            <UserImg src={info.user.image} alt="#" />
            <UserNickNAME>{info.user.nickname}</UserNickNAME>
          </UserDiv>
        </SubDiv>
      </TitleDiv>
      <hr />
      {datas.map((bucket, index) => (
        <SocialItemContent data={bucket} key={index} />
      ))}
      {resDatas.length !== 0 && buttonStatus ? <ButtonArrow clickEvent={clickEvent} /> : null}
    </TopDiv>
  );
}
