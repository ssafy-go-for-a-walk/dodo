import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/sidebar/Sidebar";
import Topbar from "../common/sidebar/Topbar";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Div = styled.div`
  left: 0px;
  width: ${props => (props.open ? sizeConfigs.sidebar.width : "0")};
  flex-shrink: 0;
  transition: all 0.5s ease-out;
`;

const MainLayout = () => {
  const { user } = useSelector(state => state)
  const open = user.sidebarIsOpen
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      {console.log(user.sidebarIsOpen)}
      <Div component="nav" open={open}>
        <Sidebar open={open}/>
      </Div>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: "100%",
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
