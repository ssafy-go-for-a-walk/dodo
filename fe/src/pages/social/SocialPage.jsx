import React from "react";
import SocialItem from "./SocialItem";
import DATA from "./datas.json"
import styled from "styled-components";

const Div = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	align-items: center;
`

export default function SocialPage() {
	const datas = DATA.datas
	return (
		<Div>
			{datas ? datas.map((data, index) => (
				<SocialItem data={data} key={index}/>
			)): null}
		</Div>
	)
}