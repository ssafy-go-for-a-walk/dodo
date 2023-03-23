// import React, { useState } from "react";
import React from "react";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";
// import { useSelector } from "react-redux";

const TopDiv = styled.div`
	display: flex;
	flex-direction: column;
`

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const UserImg = styled.img`
	margin-top: 24px;
	height: 150px;
  width: 150px;
  border-radius: 100px;
	/* border: thick double #32a1ce; */
	box-shadow: 0px 4px 4px rgba(28, 155, 255, 0.75);;
`

export default function SettingProfile(props) {
	// const [newNickname, setNewNickname] = useState("")
	const userImg = "https://img.danawa.com/prod_img/500000/017/350/img/13350017_1.jpg?shrink=330:*&_v=20210224095944"
	// const userNickname = "짱구는 못말려"
	// const { user } = useSelector((state) => state)
	// const userImg = user.value.loginUserImg
	// const userNickname = user.value.loginUserNickname
	const closeProfileModal = () => {
		props.closeProfileModal()
	}
	return (
		<TopDiv>
			<div style={{display: "flex", justifyContent: "end"}}>
				<IconButton sx={{width: "40px", right: "10ox", left: "auto"}}>
					<CloseIcon style={{color: "#1C9BFF"}} onClick={closeProfileModal}/>
				</IconButton>
			</div>
			<Div>
				<div style={{fontWeight: "700", fontSize: "20px"}}>
					프로필 수정
				</div>
				<UserImg
          src={userImg}
          alt="#"
        />

			</Div>
		</TopDiv>
	)
}