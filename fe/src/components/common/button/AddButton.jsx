import React, { useState } from "react";
import styled from "styled-components";
import { MdCheck } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { changeCompleteRate } from "../../../redux/user";
import axios from "axios";

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

export default function AddButton(props) {
  const { bucket } = props;
  const [selected, setSelected] = useState(bucket.isAdded);
  const { user } = useSelector(state => state);
  const bucketListId = user.value.selectedBucketlist.pk;
  const dispatch = useDispatch();
  const addBucket = event => {
    event.preventDefault();
    axios
      .post(
        `https://j8b104.p.ssafy.io/api/bucketlists/${bucketListId}/buckets/${bucket.publicBucketSeq}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
        },
      )
      .then(res => {
        const resData = res.data.data;
        dispatch(changeCompleteRate(resData.completeRate));
        setSelected(true);
      });
  };

  return (
    <ButtonBox onClick={addBucket} selected={selected} disabled={selected && "disabled"}>
      {selected ? <MdCheck className="checkIcon" /> : "담기"}
    </ButtonBox>
  );
}
