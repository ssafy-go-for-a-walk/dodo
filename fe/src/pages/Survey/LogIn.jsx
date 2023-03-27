import React from "react";
import styled from "styled-components"

const LogInButton = styled.button`
    border: none;
    font-size: 14px;
    margin-left: auto;
    float: right;
		background: white;
		&:hover{
        cursor: pointer;
    }
`

export default function LogIn() {
	return <LogInButton onClick={() => window.open("https://j8b104.p.ssafy.io/api/oauth2/authorization/kakao")}>로그인</LogInButton>

}