import React from "react";
import styled from "styled-components";
import Tag from "../../components/common/bucket/Tag";
import { FcCalendar } from "react-icons/fc";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 28px;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
  border-radius: 8px;
  margin: 0 16px 16px 16px;
  background: ${props => (props.images.length !== 0 ? "#ffffff" : "#E9F5FF")};
`;

const CardHeader = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
`;

const BucketImoge = styled.span`
  font-size: 24px;
`;

const BucketTitle = styled.div`
  width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CreateDate = styled.div`
  display: flex;
  width: 100%;
  height: 32px;
  align-items: center;
  margin-bottom: 16px;
  font-size: 16px;

  .calendar {
    margin-right: 8px;
  }
`;

const DiaryImg = styled.img`
  width: 100%;
  margin-bottom: 16px;
`;

const DiaryContent = styled.div`
  width: 100%;
  font-size: 16px;
  word-break: break-all;
`;

export default function ShareDiary(props) {
  const { diary } = props;
  return (
    <Card images={diary.images}>
      <CardHeader>
        <BucketImoge role="img">{diary.emoji}</BucketImoge>
        <BucketTitle>{diary.title}</BucketTitle>
        <Tag category={diary.category.item} />
      </CardHeader>
      <CreateDate>
        <FcCalendar className="calendar" />
        {diary.createdAt.substring(0, 10)}
      </CreateDate>
      {diary.images.length !== 0 && <DiaryImg src={diary.images} />}
      <DiaryContent>{diary.content}</DiaryContent>
    </Card>
  );
}
