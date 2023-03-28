import React from "react";
import styled from "styled-components";
import Tag from "../common/bucket/Tag";
import calender from "../../assets/images/calender.png";

const Card = styled.div`
  width: 288px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 28px;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  border-radius: 8px;
  margin: 0 24px 16px 24px;
`;

const CardHeader = styled.div`
  display: flex;
  height: 32px;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
`;

const CreateDate = styled.div`
  display: flex;
  height: 32px;
  align-items: center;
  margin-bottom: 16px;
  font-size: 14px;
`;

const DiaryImg = styled.img`
  width: 400px;
  height: 400px;
  margin-bottom: 16px;
`;

const DiaryContent = styled.div`
  width: 400px;
  font-size: 16px;
`;

export default function DiaryCard(props) {
  return (
    <Card>
      <CardHeader>
        {props.title}
        <Tag>{props.category}</Tag>
      </CardHeader>
      <CreateDate>
        {calender}
        {props.date}
      </CreateDate>
      <DiaryImg src={props.image} />
      <DiaryContent>{props.content}</DiaryContent>
    </Card>
  );
}
