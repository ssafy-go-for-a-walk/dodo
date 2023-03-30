import React, { useState } from "react";
import styled from "styled-components";
import ManageBucket from "./ManageBucket";
import Filter from "./Filter";
import ManageSearchBar from "./ManageSearchBar";
import { useSelector } from "react-redux";

const BucketList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterSearch = styled.div`
  width: 80%;
  max-width: 800px;
  margin-bottom: 24px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default function ManageBucketList() {
  const { user } = useSelector(state => state);
  const myBuckets = user.bucketList.buckets;
  const [bucketFilter, setBucketFilter] = useState("전체");
  const changeBucketFilter = fil => {
    setBucketFilter(fil);
  };

  return (
    <BucketList>
      <FilterSearch>
        <Filter bucketFilter={bucketFilter} propFunction={changeBucketFilter} />
        <ManageSearchBar />
      </FilterSearch>
      {bucketFilter === "전체" && myBuckets.map(bucket => <ManageBucket bucket={bucket} key={bucket.seq} />)}
      {bucketFilter === "완료" && myBuckets.filter(bucket => bucket.complete === true).map(bucket => <ManageBucket bucket={bucket} key={bucket.seq} />)}
      {bucketFilter === "미완" && myBuckets.filter(bucket => bucket.complete === false).map(bucket => <ManageBucket bucket={bucket} key={bucket.seq} />)}
    </BucketList>
  );
}
