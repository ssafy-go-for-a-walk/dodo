import React from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
    font-weight: 1000;
  }
`;

const PTag = styled.p`
  margin: 8px 0px 8px 8px;
`;

export default function Setting(props) {
  const openProfileModal = () => {
    props.closeModal();
  };
  return (
    <>
      <Div onClick={openProfileModal}>
        <SettingsIcon color="disabled" />
        <PTag>설정</PTag>
      </Div>
    </>
  );
}
