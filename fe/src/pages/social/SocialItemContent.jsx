import React from "react";
import styled from "styled-components";
import Category from "./Category";

const Div = styled.div`
	display: flex;
	margin-top: 16px;
	margin-bottom: 16px;
	margin-left: 40px;
	align-items: center;
`

const PTag = styled.p`
	margin: 0px;
	font-size: 16px;
	max-width: 272px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
`

export default function SocialItemContent(props) {
	const category = props.data.category
	const content = props.data.content
	return (
		<Div>
			<Category category={category}/>
			<PTag>
				{content}
			</PTag>
		</Div>
	)
}