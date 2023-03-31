import axios from "axios";
import React, { useCallback, useRef, useState } from "react";
import { useSelector } from "react-redux";
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

const UploadBtn = styled.div`
  width: 80px;
  height: 32px;
  border-radius: 8px;
  background: #acabab;
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
`;

const UploadImg = styled.img`
  width: 64px;
  height: 64px;
  cursor: pointer;
`;

const DiaryContent = styled.textarea`
  width: 420px;
  min-height: 32px;
  max-height: 64px;
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
  height: 32px;
  background: none;
  border: none;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: #acabab;
  }
`;

export default function DiaryForm(props) {
  const { bucketId } = props;
  const [diaryImg, setDiaryImg] = useState({ image: "", imageConfirm: "" });
  const [diaryContent, setDiaryContent] = useState("");
  const photoInput = useRef();
  const { user } = useSelector(state => state);
  const userToken = user.value.token;
  const textRef = useRef();
  const handleResizeHeight = useCallback(() => {
    textRef.current.style.height = textRef.current.scrollHeight + "px";
  }, []);
  const changeImage = event => {
    setDiaryImg({ image: URL.createObjectURL(event.target.files[0]), imageConfirm: event.target.files[0] });
  };
  const changeContent = event => {
    setDiaryContent(event.target.value);
  };
  const onKeyPress = event => {
    if (event.key === "Enter" && !event.shiftKey) {
      createDiary();
    }
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
        })
        .catch(err => console.log(err));
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
      <DiaryContent value={diaryContent} onChange={changeContent} onKeyPress={onKeyPress} ref={textRef} onInput={handleResizeHeight} />
      <CreateBtn onClick={createDiary}>작성</CreateBtn>
    </Form>
  );
}
