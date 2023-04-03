import React from "react";
import { ListItemButton, ListItemIcon } from "@mui/material";
import colorConfigs from "../../../../configs/colorConfigs";
import LoginIcon from '@mui/icons-material/Login';
import Modal from "react-modal";
import EnterBucikitliststyle from "./EnterBucikitliststyle";
import EnterBuckitlist from "../modal/EnterBuckitlist";
import { useState } from "react";

export default function EnterNewBuckitlist(props) {
	const [isOpen, setIsOpen] = useState(false);
	const closeModal = () => {
		setIsOpen(false);
	}
	return (
		<div>
			<ListItemButton
				onClick={() => setIsOpen(true)}
				sx={{
					"&: hover": {
						backgroundColor: colorConfigs.sidebar.hoverBg
					},
					fontWeight: "700",
					paddingY: "8px",
					paddingX: "24px"
				}}
			>
				<ListItemIcon sx={{
					color: colorConfigs.sidebar.color
				}}>
					<LoginIcon />
				</ListItemIcon>
				그룹 버킷리스트 참여하기
			</ListItemButton>
			<Modal
				isOpen={isOpen}
				onRequestClose={() => setIsOpen(false)}
				style={EnterBucikitliststyle}
				ariaHideApp={false}
			>
				<EnterBuckitlist closeModal={closeModal}/>
			</Modal>
		</div>
		)
}