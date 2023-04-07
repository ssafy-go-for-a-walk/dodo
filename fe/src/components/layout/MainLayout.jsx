import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/sidebar/Sidebar";
import Topbar from "../common/sidebar/Topbar";
import styled from "styled-components";
import { useState } from "react";

const Div = styled.div`
  left: 0px;
  width: ${props => props.open ? sizeConfigs.sidebar.width : "0"};
  flex-shrink: 0;
  transition: all 0.5s ease-out;
`

const MainLayout = () => {
  const [open, setOpen] = useState(true)
  const controlSidevar = () => {
    setOpen(bool => !bool)
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar open={controlSidevar}/>
      <Div component="nav" open={open}>
        <Sidebar open={open}/>
      </Div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;