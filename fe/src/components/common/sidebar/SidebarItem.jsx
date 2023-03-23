import { ListItemButton, ListItemIcon } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import colorConfigs from "../../../configs/colorConfigs";


const SidebarItem = (props) => {
  const { user } = useSelector((state) => state);
  const appState = user.appState
  const item = props.item
  return (
    item.sidebarProps && item.path ? (
      <ListItemButton
        component={Link}
        to={item.path}
        sx={{
          "&: hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg
          },
          backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
          paddingY: "8px",
          paddingX: "24px",
          fontWeight: "700",
        }}
      >
        <ListItemIcon sx={{
          color: colorConfigs.sidebar.color
        }}>
          {item.sidebarProps.icon && item.sidebarProps.icon}
        </ListItemIcon>
        {item.sidebarProps.displayText}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;