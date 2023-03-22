import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import colorConfigs from "../../configs/colorConfigs";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useSelector } from "react-redux";

const SidebarItemCollapse = (props) => {
  const [open, setOpen] = useState(false);
  const item = props.item
  const { user } = useSelector((state) => state);
  const appState = user.appState

  useEffect(() => {
    if (appState?.includes(item.state)) {
      setOpen(true);
    }
  }, [appState, item]);

  return (
    item.sidebarProps ? (
      <>
        <ListItemButton
          onClick={() => setOpen(!open)}
          sx={{
            "&: hover": {
              backgroundColor: colorConfigs.sidebar.hoverBg
            },
            paddingY: "8px",
            paddingX: "24px"
          }}
        >
          {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
          <ListItemText
            disableTypography
            primary={
              <Typography sx={{fontWeight: "700"}}>
                {item.sidebarProps.displayText}
              </Typography>
            }
            sx={{marginLeft: "30px"}}
          />
          <ListItemText
            disableTypography
            primary={
              <Typography>
                {item.child.length}
              </Typography>
            }
            sx={{textAlign: "right"}}
          />
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                <ListItemButton
                  key={index}
                  sx={{
                    "&: hover": {
                      backgroundColor: colorConfigs.sidebar.hoverBg
                    },
                    backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
                    paddingY: "8px",
                    paddingX: "24px",
                    display: "inline-block",
                    width: "300px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {route.sidebarProps.displayText}
                </ListItemButton>
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;