import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import SideBar from "../components/sideBar/SideBar";
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
