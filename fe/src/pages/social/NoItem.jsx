import styled from "styled-components"

const Div = styled.div`
	margin-top: 40vh;
	font-size: 24px;
`

export default function NoItem() {
	return (
		<Div>공유된 버킷리스트가 없습니다.</Div>
	)
}