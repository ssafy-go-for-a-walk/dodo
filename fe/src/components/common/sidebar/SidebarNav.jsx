import React, { useCallback, useEffect, useState } from "react";
import appRoutes from "../../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SelectedItem from "./SelectedItem";
import EnterNewBuckitlist from "./newbuckitlist/EnterNewBuckitlist";
import MakeNewBuckitlist from "./newbuckitlist/MakeNewBuckitlist";
import { useSelector } from "react-redux";
import axios from "axios";
import styled from "styled-components";

const Div = styled.div`
  height: calc(100vh - 317px);
  overflow-x: hidden;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgb(28 155 255);
    border-radius: 16px;
  }
`;

export default function SidebarNav() {
  const [form, setForm] = useState({
    single: [],
    group: [],
  });
  const { user } = useSelector(state => state);
  const signal = user.sidebar;
  const getBuckitlist = useCallback(async () => {
    await axios
      .get("https://j8b104.p.ssafy.io/api/users/bucketlists", {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
        },
      })
      .then(res =>
        setForm({
          single: res.data.data.SINGLE,
          group: res.data.data.GROUP,
        }),
      );
  }, [user]);

  useEffect(() => {
    getBuckitlist();
  }, [getBuckitlist, signal]);

  return (
    <>
      <MakeNewBuckitlist />
      <EnterNewBuckitlist />
      {appRoutes.map((route, index) => (route.sidebarProps ? <SidebarItem item={route} key={index} /> : null))}
      <SelectedItem />
      <Div>
        <SidebarItemCollapse item={form.single} type={"single"} name={"나의 버킷리스트"} />
        <SidebarItemCollapse item={form.group} type={"group"} name={"그룹 버킷리스트"} />
      </Div>
    </>
  );
}
