import React, { useState, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import axios from "axios";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import { profile } from "../../../../redux/user";

const TopDiv = styled.div`
  display: flex;
  flex-direction: column;
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

const NicknameInputBox = styled.input`
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

const CheckNickname = styled.div`
  display: flex;
  width: 296px;
  align-items: center;
  justify-content: space-between;
`;

const Guide = styled.p`
  margin: 0px;
  font-size: 16px;
  /* animation: {move} 2s 1s infinite; */
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

const addStyle = {
  position: "relative",
  left: "-25px",
  color: "#9A9A9A",
  "&:hover": {
    cursor: "pointer",
  },
};

export default function SettingProfile(props) {
  const { user } = useSelector(state => state);
  const [checkNickname, setCheckNickname] = useState(true);
  const [form, setForm] = useState({
    nickname: user.value.loginUserNickname,
    changeNickname: "",
    userImg: user.value.loginUserImg,
    imageConfirm: null,
  });
  const dispatch = useDispatch();
  const photoInput = useRef();
  const closeModal = () => {
    props.closeProfileModal();
  };
  const changeNickname = eve => {
    setForm({ ...form, changeNickname: eve.target.value });
    if (eve.target.value.length === 0) {
      setCheckNickname(true);
      return;
    }
    axios
      .get("https://j8b104.p.ssafy.io/api/users/check/nickname", {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
        params: {
          nn: eve.target.value,
        },
      })
      .then(res => {
        setCheckNickname(res.data.data.isAvailable);
      });
  };
  const imgUpload = eve => {
    setForm({ ...form, userImg: URL.createObjectURL(eve.target.files[0]), imageConfirm: eve.target.files[0] });
  };
  const getUser = () => {
    const data = {
      loginUserImg: form.userImg,
      loginUserNickname: form.nickname,
    };
    if (form.changeNickname !== "") {
      data.loginUserNickname = form.changeNickname;
    }
    dispatch(profile(data));
    props.closeProfileModal();
  };
  const changeProfile = () => {
    if (form.changeNickname.length === 0) {
      alert("닉네임을 입력하세요");
    } else if (!checkNickname) {
      alert("이미 존재하는 닉네임입니다");
    } else {
      const formData = new FormData();
      const data = JSON.stringify({
        nickname: form.changeNickname,
      });
      if (form.imageConfirm !== null) {
        formData.append("profileImage", form.imageConfirm);
      }
      formData.append("data", data);
      axios
        .post("https://j8b104.p.ssafy.io/api/users", formData, {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(getUser());
    }
  };
  return (
    <TopDiv>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }} onClick={closeModal}>
          <CloseIcon style={{ color: "#1C9BFF" }} />
        </IconButton>
      </div>
      <Div>
        <div style={{ fontWeight: "700", fontSize: "20px" }}>프로필 수정</div>
        <div>
          <UserImg src={form.userImg} alt="#" />
          <input type="file" accept="image/jpg, image/jpeg, image/png" multiple ref={photoInput} style={{ display: "none" }} onChange={imgUpload} />
          <BrightnessHighIcon
            sx={addStyle}
            onClick={() => {
              photoInput.current.click();
            }}
          />
        </div>
        <NicknameInputBox onChange={changeNickname} value={form.changeNickname} maxLength={8} type="text" placeholder={form.nickname} />
        <CheckNickname>
          <Guide style={{ color: "#FF0000" }}>{checkNickname ? "" : "이미 존재하는 닉네임입니다."}</Guide>
          <Guide style={{ color: "#868E96" }}>{form.changeNickname.length} / 8자</Guide>
        </CheckNickname>
        <SubmitButton onClick={changeProfile}>저장하기</SubmitButton>
      </Div>
    </TopDiv>
  );
}
