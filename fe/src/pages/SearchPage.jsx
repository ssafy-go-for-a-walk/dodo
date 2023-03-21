import React from "react";
import styled from "styled-components";
import Header from "../components/header/Header";
import SideBar from "../components/sideBar/SideBar";
import Search from "../components/search/Search";
// import CodeModal from "../components/common/modal/CodeModal";
// import Backdrop from "../components/common/modal/Backdrop";
// import GroupModal from "../components/common/modal/GroupModal";

const Div = styled.div``;

export default function SearchPage() {
  return (
    <>
      {/* <Header /> */}
      <Div>
        {/* <SideBar /> */}
        <Search />
      </Div>
    </>
  );
}
