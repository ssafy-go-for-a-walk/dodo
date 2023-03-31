import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { changeCompleteRate, reBucketList } from "../../../redux/user";

const ButtonBox = styled.button`
  min-width: 64px;
  height: 32px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.complete ? "#1c9bff" : "#E9F5FF")};
  color: ${props => (props.complete ? "#ffffff" : "#000000")};
  font-size: 14px;
  cursor: pointer;
`;

export default function CompleteButton(props) {
  const { complete, bucketId } = props;
  const { user } = useSelector(state => state);
  const userToken = user.value.token;
  const dispatch = useDispatch();
  const completeBucket = event => {
    event.stopPropagation();
    event.preventDefault();
    axios
      .post(
        `https://j8b104.p.ssafy.io/api/buckets/${bucketId}/complete`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .then(res => {
        dispatch(reBucketList(res.data.data.buckets));
        dispatch(changeCompleteRate(res.data.data.completeRate));
      })
      .catch(err => console.log(err));
  };

  return (
    <ButtonBox complete={complete} onClick={completeBucket}>
      {complete ? "완료" : "미완"}
    </ButtonBox>
  );
}
