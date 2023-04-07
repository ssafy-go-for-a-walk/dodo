import { Drawer, List } from "@mui/material";
import colorConfigs from "../../../configs/colorConfigs";
import sizeConfigs from "../../../configs/sizeConfigs";
import SidebarNav from "./SidebarNav";

export default function Sidebar(props) {
  return (
    <Drawer
      PaperProps={{
        sx: { top: "64px" },
      }}
      variant="permanent"
      sx={{
        height: `calc(100% - ${sizeConfigs.sidebar.width})`,
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          left: props.open ? "0px" : "-300px",
          width: "300px",
          height: `calc(100% - 64px)`,
          transition: "all 0.5s ease-out",
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      }}
    >
      <List>
        <SidebarNav />
      </List>
    </Drawer>
  );
}
