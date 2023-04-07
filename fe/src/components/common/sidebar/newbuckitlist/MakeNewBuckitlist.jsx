import React from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import colorConfigs from "../../../../configs/colorConfigs";
import AddIcon from "@mui/icons-material/Add";
import MakeBuckitlist from "../modal/MakeBuckitlist";
import Modal from "react-modal";
import { useState } from "react";
import MakeBucikitliststyle from "./MakeBucikitliststyle";

export default function MakeNewBuckitlist(props) {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <ListItemButton
        onClick={() => setIsOpen(true)}
        sx={{
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg,
          },
          fontWeight: "700",
          paddingY: "8px",
          paddingX: "24px",
        }}
      >
        <ListItemIcon
          sx={{
            color: colorConfigs.sidebar.color,
          }}
        >
          <AddIcon />
        </ListItemIcon>
        새로운 버킷리스트 만들기
      </ListItemButton>
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={MakeBucikitliststyle} ariaHideApp={false}>
        <MakeBuckitlist closeModal={closeModal} />
      </Modal>
    </div>
  );
}
