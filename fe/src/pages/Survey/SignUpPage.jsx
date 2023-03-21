import React from "react";
import styled from "styled-components"
// import { useLocation } from "react-router";
import Logo from '../../imges/logo.jpg';
// import Kakao from "../../imges/kakaologin.png"
import KakaoLogo from "../../imges/kakaologo.png"

const Div = styled.div`
	display: flex;
	justify-content: center;
	min-width: 360px;
`

const LogoImg = styled.img`
	height: 35vw;
	min-height: 400px;
	max-height: 600px;
	margin-top: 5vw;
`

const PTag = styled.p`
	font-size: 14px;
	margin: 0px;
	text-align: center;
	font-weight: 500;
`

const DivKakao = styled.div`
	background: #ffeb00;
	min-width: 360px;
	max-width: 650px;
	width: 40vw;
	height: 50px;
	margin-top: 50px;
	border-radius: 16px;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	display: flex;
  align-items: center;
	justify-content: center;
	&:hover{
		box-shadow: none;
		cursor: pointer;
	}
`

export default function SignUpPage() {
	// const { state } = useLocation();
	// const selected = state.selected
	return (
		<div>
			<Div>
				<LogoImg src={Logo} alt="LOGO"/>
			</Div>
			<Div>
				<PTag>
					아이디, 비밀번호, 이름, 휴대번호 입력하기 귀찮으시죠?
				</PTag>
			</Div>
			<Div>
				<PTag>
					카카오로 1초 만에 회원가입 하세요.
				</PTag>
			</Div>
			<Div>
				<DivKakao>
					<img src={KakaoLogo} alt="#" style={{height : "60%", marginRight: "1vw"}}/>
					<PTag style={{fontSize: "16px", fontWeight: "700"}}>
						카카오로 시작하기
					</PTag>
				</DivKakao>
			</Div>
		</div>
	)
}