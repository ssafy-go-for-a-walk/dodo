import React, { useState } from "react";
import styled from "styled-components"
import Survey from "./Survey";
import LogIn from "./LogIn";

const list = [
{
    id: 1,
    content: "세계 여행하기"
},
{
    id: 2,
    content: "점심 먹기"
},
{
    id: 3,
    content: "점심 먹기"
},
{
    id: 4,
    content: "점심 먹기"
},
{
    id: 5,
    content: "점심 먹기"
},
{
    id: 6,
    content: "점심 먹기"
},
{
    id: 7,
    content: "점심 먹기"
},
{
    id: 8,
    content: "점심 먹기"
},
]

const DivTop = styled.div`
    min-width: 350px;
    width: 100%;
    display: inline-block;
`

const Div = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const Title = styled.h3`
    width:100%;
    text-align: center;
    margin: 0;
`

const NextButton = styled.button`
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    &:hover{
        box-shadow: none;
        cursor: pointer;
    }
    background: #1C9BFF;
    color: #FFFFFF;
    border-radius: 16px;
    border: none;
    width: 40vw;
    min-width: 350px;
    height: 50px;
    font-size: 16px;
    margin-top: 20px;
`

const brTag = <div style={{lineHeight: "500%"}}>
<br/>
</div>

export default function SurveyPage() {
    const [selected, setSelected] = useState([])
    const changeData = (id) => {
        console.log(id)
        if (selected.includes(id)) {
            setSelected(selec => selec.filter(v => v !== id))
        } else {
            setSelected(selec => selec.concat(id))
        }
    }
    return (
        <DivTop>
            <LogIn/>
            {brTag}
            <Div>
                <Title>
                    관심있는 버킷 리스트를 선택해주세요.
                </Title>
                <Title>
                    {selected.length !== 0 ? selected.length : null}
                </Title>
                {list.map(data => (
                    <Survey
                    select={selected.includes(data.id)}
                    content={data.content}
                    id={data.id}
                    key={data.id}
                    propFunction={changeData}
                    />
                ))}
                <NextButton>
                    다 골랐어요!
                </NextButton>
            </Div>
        </DivTop>
    )
}