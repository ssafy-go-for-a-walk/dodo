import React, { useState } from "react";
import styled from "styled-components";
import ManageBucket from "./ManageBucket";
import Filter from "./Filter";
import ManageSearchBar from "./ManageSearchBar";
import { useDispatch, useSelector } from "react-redux";
import { changeMyBucketlist } from "../../redux/user";
import * as htmlToImage from "html-to-image";

const ImageBox = styled.div`
  padding-top: 24px;
  width: 100%;
  display: flex;
  background-color: rgb(245 245 245);
  flex-direction: column;
  align-items: center;
`;

const BucketList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterSearch = styled.div`
  width: 80%;
  max-width: 800px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NoBuckets = styled.div`
  margin-top: 40px;
  font-size: 40px;
  cursor: default;
`;

export default function ManageBucketList() {
  const { user } = useSelector(state => state);
  const [bucketFilter, setBucketFilter] = useState("전체");
  const myBuckets = user.bucketList.buckets;
  const dispatch = useDispatch();
  const changeBucketFilter = fil => {
    setBucketFilter(fil);
  };
  const saveImgUrl = () => {
    const document = window.document.getElementById("bucketlist");
    htmlToImage.toPng(document, { quality: 0.95, backgroundColor: "white" }).then(dataUrl => dispatch(changeMyBucketlist(dataUrl)));
  };

  return (
    <BucketList>
      <FilterSearch>
        <Filter bucketFilter={bucketFilter} propFunction={changeBucketFilter} />
        <ManageSearchBar />
      </FilterSearch>
      {myBuckets.length === 0 && <NoBuckets>버킷리스트를 추가해주세요.</NoBuckets>}
      <ImageBox id="bucketlist">
        {bucketFilter === "전체" &&
          myBuckets.map((bucket, index) => (
            <ManageBucket bucket={bucket} sendSignal={saveImgUrl} signal={bucketFilter.length === index - 1} key={bucket.seq} />
          ))}
        {bucketFilter === "완료" &&
          myBuckets.filter(bucket => bucket.complete === true).map(bucket => <ManageBucket signal={false} bucket={bucket} key={bucket.seq} />)}
        {bucketFilter === "미완" &&
          myBuckets.filter(bucket => bucket.complete === false).map(bucket => <ManageBucket signal={false} bucket={bucket} key={bucket.seq} />)}
      </ImageBox>
    </BucketList>
  );
}
