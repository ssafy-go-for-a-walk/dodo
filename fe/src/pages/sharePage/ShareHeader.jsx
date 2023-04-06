import React from "react";
import styled from "styled-components";

const Div = styled.div`
  position: sticky;
  top: 64px;
  width: 100%;
  height: 112px;
  border-bottom: 1px solid #757575;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  background: #ffffff;
`;

const Header = styled.div`
  height: 64px;
  width: 80%;
  max-width: 800px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: start;
  cursor: default;
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
  margin-top: 16px;
`;

const FilterDiv = styled.div`
  height: 32px;
  font-size: 18px;
  font-weight: ${props => props.selected && "bold"};
  color: ${props => (props.selected ? "#1c9bff" : "#757575")};
  border-bottom: ${props => (props.selected ? "3px solid #1c9bff" : "none")};
  margin: 0 48px;
  padding-bottom: auto;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: #1c9bff;
    border-bottom: 3px solid #1c9bff;
  }
`;

export default function ShareHeader(props) {
  const { pageFilter, info } = props;
  const changePageFilter = fil => {
    props.propFunction(fil);
  };
  return (
    <Div>
      <Header>
        <Img src={info.image} />
        <Title>{info.title}</Title>
      </Header>
      <Filter>
        <FilterDiv selected={pageFilter === "bucketList"} onClick={() => changePageFilter("bucketList")}>
          버킷리스트
        </FilterDiv>
        <FilterDiv selected={pageFilter === "diary"} onClick={() => changePageFilter("diary")}>
          경험일기
        </FilterDiv>
      </Filter>
    </Div>
  );
}
