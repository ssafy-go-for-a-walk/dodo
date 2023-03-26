import React from "react";
import styled from "styled-components";
import CloseButton from "../button/CloseButton";
import { MdContentCopy } from "react-icons/md";

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

export default function GroupModal(props) {
  return (
    <Modal>
      <CloseButton />
      <Title>참여코드</Title>
      <Content>참여코드는 N분간 유효합니다.</Content>
      <Code>
        BCD2E90
        <MdContentCopy className="copy" />
      </Code>
      <Copy>복사되었습니다.</Copy>
    </Modal>
  );
}
