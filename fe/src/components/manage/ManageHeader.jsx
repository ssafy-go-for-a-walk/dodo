import React from "react";
import styled from "styled-components";

const Div = styled.div`
  position: sticky;
  top: 0;
  width: 100%;
  height: 128px;
  border-bottom: 1px solid #757575;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background: #ffffff;
  margin-bottom: 24px;
`;

const Header = styled.div`
    height: 64px;
    margin: 15px 24px 23px 24px;
    display; flex;
    align-items: center;
`;

const Img = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  margin-right: 16px;
`;

const Title = styled.div`
  font-size: 24px;
`;

const Filter = styled.div`
  display: flex;
`;

const FilterDiv = styled.div`
  height: 24px;
  font-size: 16px;
  font-weight: ${props => props.select && "bold"};
  color: ${props => (props.select ? "#424242" : "#757575")};
  border-bottom: ${props => (props.select ? "2px solid #424242" : "none")};
  margin: 0 48px;
  cursor: pointer;
`;

export default function ManageHeader(props) {
  const changeFilter = idx => {
    props.propFunction(idx);
  };
  return (
    <Div>
      <Header>
        <Img src={props.image} />
        <Title>{props.title}</Title>
      </Header>
      <Filter>
        <FilterDiv select={props.filter[0]} onClick={() => changeFilter(0)}>
          버킷리스트
        </FilterDiv>
        <FilterDiv select={props.filter[1]} onClick={() => changeFilter(1)}>
          경험일기
        </FilterDiv>
        <FilterDiv select={props.filter[2]} onClick={() => changeFilter(2)}>
          설정
        </FilterDiv>
      </Filter>
    </Div>
  );
}
