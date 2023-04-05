import React, { useState } from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { reBucketList, changeCompleteRate } from "../../../redux/user";

const ButtonBox = styled.button`
  min-width: 64px;
  height: 32px;
  border-radius: 5px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.selected ? "#F1F3F5" : "#E9F5FF")};
  font-size: 14px;
  cursor: ${props => (props.selected ? "" : "pointer")};

  .checkIcon {
    color: #1c9bff;
    font-size: 32px;
  }
`;

export default function SearchAddButton(props) {
  const { bucket } = props;
  const [selected, setSelected] = useState(bucket.isAdded);
  const { user } = useSelector(state => state);
  const bucketListId = user.value.selectedBucketlist.pk;
  const userToken = user.value.token;
  const dispatch = useDispatch();
  const addBucket = event => {
    event.preventDefault();
    axios
      .post(
        `https://j8b104.p.ssafy.io/api/bucketlists/${bucketListId}/buckets/${bucket.publicBucketSeq}/search`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .then(res => {
        const resData = res.data.data;
        dispatch(reBucketList(resData.buckets));
        dispatch(changeCompleteRate(resData.completeRate));
        setSelected(true);
      })
      .catch(err => console.log(err));
  };

  return (
    <ButtonBox onClick={addBucket} selected={selected} disabled={selected && "disabled"}>
      {selected ? <MdCheck className="checkIcon" /> : "담기"}
    </ButtonBox>
  );
}
