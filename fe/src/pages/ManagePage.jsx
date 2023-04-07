import React from "react";
import styled from "styled-components";
import Manage from "../components/manage/Manage";
// import Backdrop from "../components/common/modal/Backdrop";

const Div = styled.div``;

export default function ManagePage() {
  return (
    <>
      {/* <Header /> */}
      <Div>
        {/* <SideBar /> */}
        <Manage />
      </Div>
    </>
  );
}
