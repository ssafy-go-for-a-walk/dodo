import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PercentCompo from "./PercentCompo";

const Div = styled.div`
  margin: 8px 8px 8px 24px;
`;

const Title = styled.div`
  font-weight: 700;
`;

const ColmletedComment = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
`;

const Comment = styled.div`
  display: flex;
`;

const Percent = styled.div`
  justify-content: end;
  margin-right: 16px;
  color: #0e5ab7;
`;

export default function SelectedItem() {
  const { user } = useSelector(state => state);
  const completedPercent = `${user.value.selectedBucketlist.completeRate}%`;
  return (
    <Div>
      <Title>선택된 버킷리스트</Title>
      <ColmletedComment>
        <Comment>
          목표{"\u00a0"}
          <div style={{ color: "#1B9BFE" }}>달성</div>
          까지 이만큼 왔어요!
        </Comment>
        <Percent>{completedPercent}</Percent>
      </ColmletedComment>
      <PercentCompo percent={completedPercent} />
    </Div>
  );
}
