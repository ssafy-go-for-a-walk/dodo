import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ShareTopbar from "./ShareTopbar";
import ShareHeader from "./ShareHeader";
import ShareBucket from "./ShareBucket";
import ShareDiary from "./ShareDiary";
import SlideUp from "../../components/common/button/SlideUp";
import axios from "axios";
import { useParams } from "react-router";

const TopDiv = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  position: relative;
  top: 128px;
`;

export default function SharePage() {
  const [pageFilter, setpageFilter] = useState("bucketList");
  const [listInfo, setListInfo] = useState({ title: "", image: "" });
  const [bucketList, setBucketList] = useState([]);
  const params = useParams();

  const changePageFilter = fil => {
    setpageFilter(fil);
  };

  const getShareInfo = useCallback(async () => {
    await axios.get(`https://j8b104.p.ssafy.io/api/bucketlists/share/${params.token}`).then(res => {
      const resData = res.data.data;
      setListInfo(resData.bucketListInfo);
      setBucketList(resData.addedBuckets);
    });
  }, [params]);

  useEffect(() => {
    getShareInfo();
  }, [getShareInfo]);

  return (
    <TopDiv>
      <ShareTopbar />
      <ShareHeader pageFilter={pageFilter} info={listInfo} propFunction={changePageFilter} />
      <Div>
        {pageFilter === "bucketList" &&
          (bucketList.length !== 0 ? bucketList.map(bucket => <ShareBucket bucket={bucket} key={bucket.seq} />) : <h1>버킷리스트가 없습니다.</h1>)}
        {pageFilter === "diary" && <ShareDiary token={params.token} />}
      </Div>
      <SlideUp />
    </TopDiv>
  );
}
