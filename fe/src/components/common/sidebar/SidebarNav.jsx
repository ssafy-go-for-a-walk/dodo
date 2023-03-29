import React from "react";
import appRoutes from "../../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import SelectedItem from "./SelectedItem";
import EnterNewBuckitlist from "./newbuckitlist/EnterNewBuckitlist";
import MakeNewBuckitlist from "./newbuckitlist/MakeNewBuckitlist";

// 리덕스에 저장된거 빼올거임
const myItem = {
  sidebarProps: {
    displayText: "나의 버킷리스트",
  },
  child: [
    {
      sidebarProps: {
        displayText: "죽기 전에 해야할 100가지 버킷리스트"
      },
    },
    {
      sidebarProps: {
        displayText: "뭐냐 넌"
      }
    },
    {
      sidebarProps: {
        displayText: "까불이인데요"
      }
    }
  ]
}
const groupItem = {
  sidebarProps: {
    displayText: "그룹 버킷리스트",
  },
  child: [
    {
      sidebarProps: {
        displayText: "까불고있어"
      },
    },
    {
      sidebarProps: {
        displayText: "뺨따구"
      }
    },
    {
      sidebarProps: {
        displayText: "쨖ㄲㄲㄲㄲㄲㄲㄲㄲㄲㄲㄲ!!!!!!!!!"
      }
    }
  ]
}

export default function SidebarNav() {
	return (
		<>
      <MakeNewBuckitlist />
      <EnterNewBuckitlist />
      {appRoutes.map((route, index) => (
        route.sidebarProps ? (
          <SidebarItem item={route} key={index} />
          ) : null
          ))}
      <SelectedItem />
      <SidebarItemCollapse item={myItem} name={"나의 버킷리스트"} />
      <SidebarItemCollapse item={groupItem} name={"그룹 버킷리스트"} />
		</>
	)
}