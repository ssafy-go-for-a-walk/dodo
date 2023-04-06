import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Tooltip from "@mui/material/Tooltip";

const Div = styled.div`
  position: sticky;
  top: 64px;
  width: 100%;
  height: 128px;
  border-bottom: 1px solid #757575;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  background: #ffffff;
  margin-bottom: 24px;
`;

const Header = styled.div`
  height: 64px;
  width: 100%;
  margin-top: 16px;
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
  width: calc(100vw - 500px);
  font-size: 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Filter = styled.div`
  display: flex;
  margin-top: 16px;
`;

const FilterDiv = styled.div`
  height: 32px;
  font-size: 18px;
  font-weight: ${props => props.select && "bold"};
  color: ${props => (props.select ? "#1c9bff" : "#757575")};
  border-bottom: ${props => (props.select ? "3px solid #1c9bff" : "none")};
  margin: 0 48px;
  padding-bottom: auto;
  cursor: pointer;
  &:hover {
    font-weight: bold;
    color: #1c9bff;
    border-bottom: 3px solid #1c9bff;
  }
`;

export default function ManageHeader(props) {
  const { pageFilter } = props;
  const { user } = useSelector(state => state);
  const info = user.bucketList.info;
  const changePageFilter = fil => {
    props.propFunction(fil);
  };
  return (
    <Div>
      <Header>
        <Img src={info.image} />
        {info.title.length > 36 ? (
          <Tooltip title={info.title} placement="bottom-start" arrow>
            <Title>{info.title}</Title>
          </Tooltip>
        ) : (
          <Title>{info.title}</Title>
        )}
      </Header>
      <Filter>
        <FilterDiv select={pageFilter === "bucketList"} onClick={() => changePageFilter("bucketList")}>
          버킷리스트
        </FilterDiv>
        <FilterDiv select={pageFilter === "diary"} onClick={() => changePageFilter("diary")}>
          경험일기
        </FilterDiv>
        <FilterDiv select={pageFilter === "setting"} onClick={() => changePageFilter("setting")}>
          설정
        </FilterDiv>
      </Filter>
    </Div>
  );
}
