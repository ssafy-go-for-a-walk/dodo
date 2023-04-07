import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
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
  margin-top: 70px;
`;

const CodeInput = styled.input`
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

export default function EnterBuckitlist(props) {
  const [code, setCode] = useState("");
  const { user } = useSelector(state => state);
  const dispatch = useDispatch();
  const closeModal = () => {
    props.closeModal();
  };
  const changeName = eve => {
    setCode(eve.target.value);
  };
  const enterBuckitlist = () => {
    axios
      .post(
        `https://j8b104.p.ssafy.io/api/bucketlists/join/${code}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
        },
      )
      .then(() => {
        props.closeModal();
        dispatch(uploadBucketlist());
      })
      .catch(err => alert(err.response.data.message));
  };
  return (
    <TopDiv>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }} onClick={closeModal}>
          <CloseIcon style={{ color: "#1C9BFF" }} />
        </IconButton>
      </div>
      <Div>
        <div style={{ fontWeight: "700", fontSize: "20px" }}>그룹 참여하기</div>
        <CodeInput
          onChange={changeName}
          value={code}
          // maxLength={8}
          type="text"
          placeholder="참여코드를 입력해주세요"
        />
        <SubmitButton onClick={enterBuckitlist}>참여하기</SubmitButton>
      </Div>
    </TopDiv>
  );
}
