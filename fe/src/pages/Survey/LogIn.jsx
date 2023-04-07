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
	return <LogInButton>로그인</LogInButton>

}