import React, { useState } from "react";
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
	height: 200px;
  width: 200px;
  border-radius: 100px;
	border:1px solid #9A9A9A;
`

const NicknameInputBox = styled.input`
	&::placeholder {
		color: #868E96;
	}
	margin-top: 32px;
	width: 296px;
	font-size: 20px;
	text-align: center;
	border: none;
	color: #868E96;
	border-bottom: 1px solid #CED4DA;
`

const CheckNickname = styled.div`
	display: flex;
	width: 296px;
	align-items: center;
	justify-content: space-between;
`

const Guide = styled.p`
	margin: 0px;
	font-size: 16px;
	/* animation: {move} 2s 1s infinite; */
`

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
	background-color: #1C9BFF;
	color: white;
	font-size: 24px;
	font-weight: 700;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

export default function SettingProfile(props) {
	// const [newNickname, setNewNickname] = useState("")
	const [checkNickname] = useState(true)
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
				<NicknameInputBox type="text" placeholder="닉네임을 입력해주세요"/>
				<CheckNickname>
					<Guide style={{color: "#FF0000"}}>
						{checkNickname ? "" : "이미 존재하는 닉네임입니다."}
					</Guide>
					<Guide style={{color: "#868E96"}}>
						0 / 8자
					</Guide>
				</CheckNickname>
				<SubmitButton>
					저장하기
				</SubmitButton>
			</Div>
		</TopDiv>
	)
}