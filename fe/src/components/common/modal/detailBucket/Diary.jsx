import React from "react";
import styled from "styled-components";

const DiaryDiv = styled.div`
  height: 80px;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid #acabab;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DiaryImg = styled.img`
  width: 64px;
  height: 64px;
  margin-right: 14px;
`;

const DiaryContent = styled.div`
  width: ${props => (props.path === null ? "400px" : "322px")};
  padding: ${props => (props.plus ? "0" : "23px 0")};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 18px;
`;

const DiaryCreated = styled.div`
  width: 120px;
  font-size: 18px;
  color: #5f5f5f;
  text-align: center;
`;

export default function Diary(props) {
  const { diaryImg, diaryContent, diaryCreated } = props;
  return (
    <DiaryDiv>
      <DiaryImg src={diaryImg} />
      <DiaryContent>{diaryContent}</DiaryContent>
      <DiaryCreated>{diaryCreated}</DiaryCreated>
    </DiaryDiv>
  );
}
