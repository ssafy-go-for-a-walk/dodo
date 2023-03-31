import React, { useState } from "react";
import styled from "styled-components";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const DiaryDiv = styled.div`
  height: 72px;
  width: 100%;
  padding-bottom: 8px;
  border-bottom: 1px solid #acabab;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const DiaryImgBox = styled.div`
  width: 64px;
  height: 64px;
`;

const DiaryImg = styled.img`
  width: 100%;
  height: 100%;
`;

const DiaryContent = styled.div`
  width: ${props => (props.plus ? "400px" : "322px")};
  overflow: hidden;
  white-space: ${props => (props.plus ? "wrap" : "nowrap")};
  font-size: 16px;
`;

const PlusBtn = styled.button`
  font-size: 16px;
  color: #acabab;
  background: none;
  border: none;
  cursor: pointer;
`;

const DiaryCreated = styled.div`
  width: 120px;
  font-size: 18px;
  color: #5f5f5f;
  text-align: center;
`;

export default function Diary(props) {
  const { diary } = props;
  const moreText = diary.content.slice(24);
  const [plus, setPlus] = useState(moreText.length !== 0 ? false : true);
  const showMore = () => {
    setPlus(true);
  };
  return (
    <DiaryDiv>
      <DiaryImgBox>{diary.images.length !== 0 && <DiaryImg src={diary.images} />}</DiaryImgBox>
      <DiaryContent plus={plus}>{diary.content}</DiaryContent>
      {!plus && <PlusBtn onClick={showMore}>...더보기</PlusBtn>}
      <DiaryCreated>{diary.createdAt.substring(0, 10)}</DiaryCreated>
    </DiaryDiv>
  );
}
