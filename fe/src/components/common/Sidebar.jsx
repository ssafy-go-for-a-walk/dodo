import { Drawer, List} from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import SidebarNav from "./SidebarNav";

const Sidebar = () => {
  return (
    <Drawer
      PaperProps={{
        sx: { top: "64px"}
      }}
      variant="permanent"
      sx={{
        height: `calc(100% - ${sizeConfigs.sidebar.width})`,
        top: "80px",
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color
        }
      }}
    >
      <List>
        <SidebarNav />
      </List>
    </Drawer>
  );
};

export default Sidebar;