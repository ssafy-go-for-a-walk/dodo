import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Form = styled.div`
  width: 100%;
  height: 80px;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background: #e9f5ff;
  border-radius: 8px;
`;

const UploadBtn = styled.div`
  width: 80px;
  height: 32px;
  border-radius: 8px;
  background: #acabab;
  color: #ffffff;
  font-size: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const UploadImg = styled.img`
  width: 64px;
  height: 64px;
  cursor: pointer;
`;

const DiaryContent = styled.textarea`
  width: 480px;
  height: 100%;

  font-size: 16px;
  border: none;
  border-bottom: 1px solid #acabab;
  overflow-y: scroll;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

const CreateBtn = styled.button`
  width: 64px;
  height: 40px;
  background: #1c9bff;
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  &:hover {
    color: #acabab;
    background: #e9f5ff;
  }
`;

export default function DiaryForm(props) {
  const { bucketId } = props;
  const [diaryImg, setDiaryImg] = useState({ image: "", imageConfirm: "" });
  const [diaryContent, setDiaryContent] = useState("");
  const photoInput = useRef();
  const { user } = useSelector(state => state);
  const userToken = user.value.token;

  const changeImage = event => {
    setDiaryImg({ image: URL.createObjectURL(event.target.files[0]), imageConfirm: event.target.files[0] });
  };
  const changeContent = event => {
    setDiaryContent(event.target.value);
  };
  const createDiary = () => {
    if (diaryContent !== "") {
      const formData = new FormData();
      const data = JSON.stringify({
        content: diaryContent,
      });
      formData.append("files", diaryImg.imageConfirm);
      formData.append("data", data);
      axios
        .post(`https://j8b104.p.ssafy.io/api/buckets/${bucketId}/diaries`, formData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => {
          props.changeDiaries(res.data.data);
          setDiaryContent("");
          setDiaryImg({ image: "", imageConfirm: "" });
        });
    }
  };
  return (
    <Form>
      <input type="file" accept="image/jpg, image/jpeg, image/png" multiple ref={photoInput} style={{ display: "none" }} onChange={changeImage} />
      {diaryImg.image === "" ? (
        <UploadBtn
          onClick={() => {
            photoInput.current.click();
          }}
        >
          첨부파일
        </UploadBtn>
      ) : (
        <UploadImg
          src={diaryImg.image}
          onClick={() => {
            photoInput.current.click();
          }}
        />
      )}
      <DiaryContent value={diaryContent} onChange={changeContent} placeholder="경험한 내용을 작성해보세요." />
      <CreateBtn onClick={createDiary}>작성</CreateBtn>
    </Form>
  );
}
