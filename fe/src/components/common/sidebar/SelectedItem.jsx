import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import SelectedButton from "./SelectedButton";
import PercentCompo from "./PercentCompo";

const Div = styled.div`
	margin: 8px 8px 8px 24px;
`

const Title = styled.div`
	font-weight: 700;
`

const ColmletedComment = styled.div`
	display: flex;
	justify-content: space-between;
	font-size: 14px;
`

const Comment = styled.div`
	display: flex;
`

const Percent = styled.div`
	justify-content: end;
	margin-right: 16px;
	color: #0E5AB7;
`

const Buckitlist = styled.div`
	display: flex;
	margin-top: 8px;
	justify-content: space-between;
	align-items: center;
`

const BuckitlistName = styled.div`
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	width: 200px;
`

export default function SelectedItem() {
	const { user } = useSelector((state) => state);
	const selectedBucketlist = user.value.loginBucketName
	// 요청을 보내서 전체 버킷리스트 개수와 완료한 버킷리스트 개수를 받아옴
	const allBuckitlistNumber = 10
	const completedBucketlistNumber = 5
	const completedPercent = `${Math.ceil((completedBucketlistNumber / allBuckitlistNumber) * 100)}%`
	return (
		<Div>
			<Title>
				선택된 버킷리스트
			</Title>
			<ColmletedComment>
				<Comment>
					목표{"\u00a0"}
					<div style={{color: "#1B9BFE"}}>
						달성
					</div>
					까지 이만큼 왔어요!
				</Comment>
				<Percent>
					{completedPercent}
				</Percent>
			</ColmletedComment>
			<PercentCompo percent={completedPercent}/>
			<Buckitlist>
				<BuckitlistName>
					{selectedBucketlist}
				</BuckitlistName>
				<SelectedButton text={"수정"}/>
			</Buckitlist>
		</Div>
	)
}