import React, { useState } from "react";
import ManageHeader from "./ManageHeader";
import ManageBucketList from "./ManageBucketList";
import ManageDiary from "./ManageDiary";
import ManageSetting from "./ManageSetting";
import SlideUp from "../common/button/SlideUp";

export default function Manage(props) {
  const [filter, setFilter] = useState([true, false, false]);
  const changeFilter = idx => {
    if (idx === 0) {
      setFilter([true, false, false]);
    } else if (idx === 1) {
      setFilter([false, true, false]);
    } else if (idx === 2) {
      setFilter([false, false, true]);
    }
  };
  return (
    <>
      <ManageHeader filter={filter} title={props.title} propFunction={changeFilter} />
      {filter[0] && <ManageBucketList />}
      {filter[1] && <ManageDiary />}
      {filter[2] && <ManageSetting />}
      <SlideUp />
    </>
  );
}
