import React from "react";
import styled from "styled-components";

const Div = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 24px;
	width: 70px;
	height: 30px;
	color: white;
	margin-right: 8px;
`

export default function SelectedButton(props) {
	const innerText = props.text
	return (
		<Div style={{backgroundColor: innerText === "선택됨" ? "#D9D9D9" : "#1C9BFF"}}>
			{innerText}
		</Div>
	)
}