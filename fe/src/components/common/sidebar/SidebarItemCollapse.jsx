import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useState } from "react";
import colorConfigs from "../../../configs/colorConfigs";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarBuckitlists from "./SidebarBuckitlists";

export default function SidebarItemCollapse(props) {
  const [open, setOpen] = useState(false);
  const type = props.type;
  const item = props.item;

  return Array.isArray(item) ? (
    <>
      <ListItemButton
        onClick={() => setOpen(!open)}
        sx={{
          "&:hover": {
            backgroundColor: colorConfigs.sidebar.hoverBg,
          },
          paddingY: "8px",
          paddingX: "24px",
        }}
      >
        {open ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
        <ListItemText
          disableTypography
          primary={<Typography sx={{ fontWeight: "700" }}>{type === "single" ? "나의 버킷리스트" : "그룹 버킷리스트"}</Typography>}
          sx={{ marginLeft: "30px" }}
        />
        <ListItemText disableTypography primary={<Typography>{item.length}</Typography>} sx={{ textAlign: "right" }} />
      </ListItemButton>
      <Collapse in={open} timeout="auto">
        <List>
          {item.map((info, index) => (
            <SidebarBuckitlists key={index} data={info} />
          ))}
        </List>
      </Collapse>
    </>
  ) : null;
}
