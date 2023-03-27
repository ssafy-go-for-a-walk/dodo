import React from "react";
import styled from "styled-components";
import ColorButton from "../button/ColorButton";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

const Modal = styled.div`
  position: fixed;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 728px;
  height: 360px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

const Title = styled.div`
  height: 44px;
  font-size: 28px;
  text-align: center;
`;

const CodeInput = styled.input`
  width: 320px;
  height: 44px;
  font-size: 22px;
  text-align: center;
  border: none;
  border-bottom: 1px solid #ced4da;
  outline: none;
  margin: 40px 0;
`;

export default function GroupModal(props) {
  const closeModal = () => {
    props.closeModal();
  };
  return (
    <Modal>
      <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }}>
        <CloseIcon style={{ color: "#1C9BFF" }} onClick={closeModal} />
      </IconButton>
      <Title>그룹 참여하기</Title>
      <CodeInput placeholder="참여코드를 입력해주세요."></CodeInput>
      <ColorButton>참여하기</ColorButton>
    </Modal>
  );
}
