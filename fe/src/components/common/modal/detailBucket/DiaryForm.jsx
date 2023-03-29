import React, { useState } from "react";
import styled from "styled-components";

const Form = styled.div`
  width: 580px;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
`;

const ImgUpload = styled.div`
  width: 80px;
  height: 32px;
  border-radius: 8px;
  background: #acabab;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`;

const uploadImg = styled.img`
  width: 64px;
  height: 64px;
`;

const DiaryContent = styled.textarea`
  width: 420px;
  heigt: 32px;
  font-size: 16px;
  border: none;
  border-bottom: 1px solid #acabab;
`;

const CreateBtn = styled.button`
  width: 64px;
  height: 32px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  &: hover {
    color: #acabab;
  }
`;

export default function DiaryForm(props) {
  const [diaryImg, setDiaryImg] = useState("");
  const [diaryContent, setDiaryContent] = useState("");
  const createDiary = event => {
    event.preventDefault();
  };
  return (
    <Form>
      <ImgUpload>첨부파일</ImgUpload>
      <DiaryContent />
      <CreateBtn onClick={createDiary}>작성</CreateBtn>
    </Form>
  );
}
