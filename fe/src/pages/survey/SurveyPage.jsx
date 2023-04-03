import React, { useState, useCallback, useEffect } from "react";
import styled from "styled-components";
import Survey from "./Survey";
import LogIn from "./LogIn";
import { useNavigate } from "react-router-dom";
import { useInView } from 'react-intersection-observer';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useDispatch } from "react-redux";
import { setSurvey } from "../../redux/user";
import axios from "axios";

const DivTop = styled.div`
  min-width: 350px;
  width: 100%;
  display: inline-block;
`;

const Div = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    &::-webkit-scrollbar {
        display: none;
    }
`

const Title = styled.h3`
  width: 100%;
  text-align: center;
  margin: 0;
`;

const NextButton = styled.button`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: none;
    cursor: pointer;
  }
  background: #1c9bff;
  color: #ffffff;
  border-radius: 16px;
  border: none;
  width: 40vw;
  min-width: 350px;
  height: 50px;
  font-size: 16px;
  margin-top: 20px;
`;

const ChoseMore = styled.button`
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  &:hover {
    box-shadow: none;
    cursor: pointer;
  } */
  background: #ADB5BD;
  color: #ffffff;
  border-radius: 16px;
  border: none;
  width: 40vw;
  min-width: 350px;
  height: 50px;
  font-size: 16px;
  margin-top: 20px;
`;

const brTag = <div style={{lineHeight: "500%"}}><br/></div>

export default function SurveyPage() {
  const [items, setItems] = useState([])
  const [selected, setSelected] = useState([])
  const [pages, setPages] = useState(0)
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeData = (id) => {
      if (selected.includes(id)) {
          setSelected(selec => selec.filter(v => v !== id))
      } else {
          setSelected(selec => selec.concat(id))
      }
  }

  const getItems = useCallback(async () => {
    await axios
    .get(`https://j8b104.p.ssafy.io/api/recomm/survey/buckets`, {
    // .get(`https://j8b104.p.ssafy.io/api/survey/buckets`, {
      params: {
        page: pages,
        size: 10,
      }
    })
    .then(res => {
      setItems(pre => [...pre, ...res.data.data.content])
    })
  }, [pages])

  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    if (inView) {
      setPages(pre => pre + 1)
    }
  }, [inView, setPages])

  const goToSignUp = () => {
    dispatch(setSurvey(selected))
    navigate("/survey/signup")
  }
    return (
        <DivTop>
            <LogIn/>
            {brTag}
            <Title>
                관심있는 버킷 리스트를 선택해주세요.
            </Title>
            <Title>
                {selected.length !== 0 ? selected.length : null}
            </Title>
            <Div style={{ minHeight: "400px", height: "34vw", overflow: "auto"}}>
              {items.map((data, index) => (
                <Survey
                select={selected.includes(data.seq)}
                content={data.title}
                emoji={data.emoji}
                id={data.seq}
                key={index}
                propFunction={changeData}
                />
              ))}
              <RefreshIcon sx={{marginTop: "8px"}} ref={ref}/>
            </Div>
            <Div>
              {selected.length < 3 
              ? (<ChoseMore>
                최소 {3 - selected.length}개 더 골라주세요!
              </ChoseMore>)
              :(<NextButton onClick={goToSignUp}>
                다 골랐어요!
              </NextButton>)}
            </Div>
        </DivTop>
    )
}
