import React from "react";
import styled from "styled-components";
import SocialItemContent from "./SocialItemContent";

const TopDiv = styled.div`
	display: inline-block;
	background-color: white;
	width: 480px;
	border-radius: 8px;
	margin-bottom: 40px;
	box-shadow: 0px 4px 4px 0px #00000040;
`

const TitleDiv = styled.div`
	display: flex;
	align-items: center;
	padding: 16px 16px 0px 16px;
`

const BuckitlistImg = styled.img`
	height: 56px;
  width: 56px;
	border-radius: 8px;
`

const SubDiv = styled.div`
	display: inline-block;
	margin-left: 16px;
`

const BuckitlistName = styled.p`
	margin: 0px;
`

const UserDiv = styled.div`
	display: flex;
	align-items: center;
`

const UserImg = styled.img`
	height: 40px;
  width: 40px;
  border-radius: 100px;
`

const UserNickNAME = styled.p`
	margin: 0px;
`

export default function SocialItem(props) {
	const info = props.data

	return (
		<TopDiv>
			<TitleDiv>
				<BuckitlistImg src={info.bucketlistImg} alt="#"/>
				<SubDiv>
					<BuckitlistName>
						{info.bucketlistName}
					</BuckitlistName>
					<UserDiv>
						<UserImg src={info.userImg} alt="#"/>
						<UserNickNAME>
							{info.userNickname}
						</UserNickNAME>
					</UserDiv>
				</SubDiv>
			</TitleDiv>
			<hr/>
			{info.bucketlist.map((bucket) => (
				<SocialItemContent data={bucket} />
			))}
		</TopDiv>
	)
}