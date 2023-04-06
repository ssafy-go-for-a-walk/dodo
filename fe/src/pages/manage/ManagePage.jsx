import React, { useState, useEffect } from "react";
import ManageHeader from "./ManageHeader";
import ManageBucketList from "./ManageBucketList";
import ManageDiary from "./ManageDiary";
import ManageSetting from "./ManageSetting";
import SlideUp from "../../components/common/button/SlideUp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setBucketList } from "../../redux/user";
import styled from "styled-components";

const TopDiv = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

export default function ManagePage() {
  const [pageFilter, setpageFilter] = useState("bucketList");
  const { user } = useSelector(state => state);
  const listId = user.value.selectedBucketlist.pk;
  const userToken = user.value.token;
  const dispatch = useDispatch();
  const changePageFilter = fil => {
    setpageFilter(fil);
  };

  useEffect(() => {
    setpageFilter("bucketList");
  }, [listId]);

  useEffect(() => {
    axios
      .get(`https://j8b104.p.ssafy.io/api/bucketlists/${listId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        const resData = res.data.data;
        const data = {
          info: resData.bucketListInfo,
          buckets: resData.addedBuckets,
        };
        dispatch(setBucketList(data));
      });
  }, [dispatch, listId, userToken]);
  return (
    <TopDiv>
      <ManageHeader pageFilter={pageFilter} propFunction={changePageFilter} />
      {pageFilter === "bucketList" && <ManageBucketList />}
      {pageFilter === "diary" && <ManageDiary />}
      {pageFilter === "setting" && <ManageSetting />}
      <SlideUp />
    </TopDiv>
  );
}
