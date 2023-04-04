import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import { MdContentCopy } from "react-icons/md";

const Modal = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  height: 44px;
  font-size: 28px;
  margin-bottom: 16px;
`;

const Content = styled.div`
  font-size: 16px;
  margin-bottom: 72px;
  color: #868e96;
`;

const Code = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  font-size: 22px;

  .copy {
    color: #1c9bff;
    font-size: 32px;
    margin-left: 20px;
    cursor: pointer;
  }
`;

const Copy = styled.div`
  font-size: 14px;
  color: #7b7b7b;
`;

export default function CodeModal(props) {
  const { code } = props;
  const [copy, setCopy] = useState(false);
  const closeModal = () => {
    props.closeModal();
  };
  const handleCopyClipBoard = async joinCode => {
    try {
      await navigator.clipboard.writeText(joinCode);
      setCopy(true);
    } catch (e) {
      alert("복사에 실패하였습니다");
    }
  };
  return (
    <Modal>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }} onClick={closeModal}>
          <CloseIcon style={{ color: "#1C9BFF" }} />
        </IconButton>
      </div>
      <Div>
        <Title>{code.title}</Title>
        <Content>{code.title === "참여코드" && "참여코드는 30분간 유효합니다."}</Content>
        <Code>
          {code.code}
          <MdContentCopy
            className="copy"
            onClick={() => {
              handleCopyClipBoard(code);
            }}
          />
        </Code>
        {copy && <Copy>복사되었습니다.</Copy>}
      </Div>
    </Modal>
  );
}
