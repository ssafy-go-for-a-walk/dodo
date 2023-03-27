import React, { useState } from "react";
import ManageHeader from "./ManageHeader";
import ManageBucketList from "./ManageBucketList";
import ManageDiary from "./ManageDiary";
import ManageSetting from "./ManageSetting";
import SlideUp from "../common/button/SlideUp";

export default function Manage(props) {
  const [pageFilter, setpageFilter] = useState("bucketList");
  const changePageFilter = fil => {
    setpageFilter(fil);
  };
  return (
    <>
      <ManageHeader pageFilter={pageFilter} title={props.title} propFunction={changePageFilter} />
      {pageFilter === "bucketList" && <ManageBucketList />}
      {pageFilter === "diary" && <ManageDiary />}
      {pageFilter === "setting" && <ManageSetting />}
      <SlideUp />
    </>
  );
}
