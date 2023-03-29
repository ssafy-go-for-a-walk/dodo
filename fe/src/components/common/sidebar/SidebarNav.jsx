import React, { useCallback, useEffect, useState } from "react";
import appRoutes from "../../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SelectedItem from "./SelectedItem";
import EnterNewBuckitlist from "./newbuckitlist/EnterNewBuckitlist";
import MakeNewBuckitlist from "./newbuckitlist/MakeNewBuckitlist";
import { useSelector } from "react-redux";
import axios from "axios";

export default function SidebarNav() {
  const [form, setForm] = useState({
    single: [],
    group: [],
    update: true,
  });
  const { user } = useSelector(state => state);
  const uploadBuckitlist = () => {
    setForm({ ...form, update: pre => !pre });
  };
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
  }, [getBuckitlist, form.update]);

  return (
    <>
      <MakeNewBuckitlist uploadBuckitlist={uploadBuckitlist} />
      <EnterNewBuckitlist uploadBuckitlist={uploadBuckitlist} />
      {appRoutes.map((route, index) => (route.sidebarProps ? <SidebarItem item={route} key={index} /> : null))}
      <SelectedItem />
      <SidebarItemCollapse item={form.single} type={"single"} name={"나의 버킷리스트"} />
      <SidebarItemCollapse item={form.group} type={"group"} name={"그룹 버킷리스트"} />
    </>
  );
}
