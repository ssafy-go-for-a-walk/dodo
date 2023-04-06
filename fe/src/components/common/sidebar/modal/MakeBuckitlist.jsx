import React, { useState, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import axios from "axios";
import FormData from "form-data";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { uploadBucketlist } from "../../../../redux/user";

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  font-family: "pretendard";
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserImg = styled.img`
  margin-top: 24px;
  height: 200px;
  width: 200px;
  border-radius: 100px;
  border: 1px solid #9a9a9a;
`;

const BuckitlistName = styled.input`
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #868e96;
  }
  margin-top: 32px;
  width: 296px;
  font-size: 20px;
  text-align: center;
  border: none;
  color: #868e96;
  border-bottom: 1px solid #ced4da;
`;

const SubmitButton = styled.div`
  &:hover {
    cursor: pointer;
  }
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60px;
  border-radius: 16px;
  width: 370px;
  height: 67px;
  background-color: #1c9bff;
  color: white;
  font-size: 24px;
  font-weight: 700;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const SelectionDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const addStyle = {
  position: "relative",
  left: "-25px",
  color: "#9A9A9A",
  "&:hover": {
    cursor: "pointer",
  },
};

const buttonStyle = {
  backgroundColor: "#1C9BFF",
  color: "white",
  width: "200px",
  height: "200px",
  right: "10ox",
  left: "auto",
  fontSize: "24px",
  borderRadius: "24px",
  "&:hover": {
    backgroundColor: "#0E5AB7",
  },
};

export default function MakeBuckitlist(props) {
  const [form, setForm] = useState({
    buckitlistName: "",
    buckitlistImg: "https://dodo-walk-bucket.s3.ap-northeast-2.amazonaws.com/default-bucklist-image.jpg",
    imageConfirm: null,
    type: "SINGLE",
    select: "",
    form: "none",
  });
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const photoInput = useRef();
  const closeModal = () => {
    props.closeModal();
  };
  const goBack = () => {
    setForm({ ...form, select: "", form: "none" });
  };
  const imgUpload = eve => {
    setForm({ ...form, buckitlistImg: URL.createObjectURL(eve.target.files[0]), imageConfirm: eve.target.files[0] });
  };
  const changeName = eve => {
    setForm({ ...form, buckitlistName: eve.target.value });
  };
  const makeBuckitlist = () => {
    if (form.buckitlistName.length === 0) {
      alert("제목을 입력해주세요");
    } else {
      const formData = new FormData();
      const data = JSON.stringify({
        title: form.buckitlistName,
        type: form.type,
      });
      if (form.imageConfirm !== null) {
        formData.append("image", form.imageConfirm);
      }
      formData.append("data", data);
      axios
        .post("https://j8b104.p.ssafy.io/api/users/bucketlists", formData, {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          props.closeModal();
          dispatch(uploadBucketlist());
        });
    }
  };
  return (
    <div>
      <TopDiv style={{ display: form.form }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }} onClick={goBack}>
            <ArrowBackIcon style={{ color: "#1C9BFF" }} />
          </IconButton>
          <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }} onClick={closeModal}>
            <CloseIcon style={{ color: "#1C9BFF" }} />
          </IconButton>
        </div>
        <Div>
          <div style={{ fontWeight: "700", fontSize: "20px" }}>버킷리스트 생성</div>
          <div>
            <UserImg src={form.buckitlistImg} alt="#" />
            <input type="file" accept="image/jpg, image/jpeg, image/png" multiple ref={photoInput} style={{ display: "none" }} onChange={imgUpload} />
            <BrightnessHighIcon
              sx={addStyle}
              onClick={() => {
                photoInput.current.click();
              }}
            />
          </div>
          <BuckitlistName
            onChange={changeName}
            value={form.buckitlistName}
            // maxLength={8}
            type="text"
            placeholder="제목을 입력해주세요"
          />
          <SubmitButton onClick={makeBuckitlist}>생성하기</SubmitButton>
        </Div>
      </TopDiv>
      <SelectionDiv style={{ display: form.select }}>
        <div style={{ display: "flex", justifyContent: "end", width: "100%", marginBottom: "140px" }}>
          <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }} onClick={closeModal}>
            <CloseIcon style={{ color: "#1C9BFF" }} />
          </IconButton>
        </div>
        <Button sx={buttonStyle} onClick={() => setForm({ ...form, select: "none", form: "" })}>
          나의 버킷리스트
        </Button>
        <Button sx={buttonStyle} onClick={() => setForm({ ...form, select: "none", form: "", type: "GROUP" })}>
          그룹 버킷리스트
        </Button>
      </SelectionDiv>
    </div>
  );
}
