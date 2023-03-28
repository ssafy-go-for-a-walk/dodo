import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Setting from "./modal/Setting";
import Logout from "./modal/Logout";

const TopDiv = styled.div`
	display: flex;
	flex-direction: column;
`

const Div = styled.div`
	display: flex;
	align-items: center;
	
`

const UserImg = styled.img`
  /* margin-right: 8px; */
	height: 32px;
  width: 32px;
  border-radius: 100px;

`

const User = styled.div`
	display: flex;
	flex-direction: column;
	margin-left: 8px;
`

const Nickname = styled.div`
	color: #3d3d3d;
`

const Email = styled.div`
	font-weight: 100;
	color: #9D9D9D;
	max-width: 180px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

export default function TopbarModal(props) {
	const closeModal = () => {
		props.closeModal()
	}
	const { user } = useSelector((state) => state)
	const userImg = user.value.loginUserImg
	const userNickname = user.value.loginUserNickname
	const userEmail = user.value.loginUserNickname
	return (
		<TopDiv>
			<Div>
				<UserImg src={userImg} alt="#"/>
				<User>
					<Nickname>
						{userNickname}
					</Nickname>
					<Email>
						{userEmail}
					</Email>
				</User>
			</Div>
			<Setting closeModal={closeModal}/>
			<Logout />
			<p style={{color: "#C0C0BF", margin: "0px"}}>
				V.0.1
			</p>
		</TopDiv>
	)
}