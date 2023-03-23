import { Collapse, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import colorConfigs from "../../../configs/colorConfigs";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useSelector } from "react-redux";
import { change } from "../../../redux/user"
import { useDispatch } from "react-redux";
import SelectedButton from "./SelectedButton";

export default function SidebarItemCollapse(props) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const item = props.item
  const { user } = useSelector((state) => state);
  const appState = user.appState
  const selectedBucketlist = user.value.loginBucketName
  const changeBucketlist = (event) => {
    if (selectedBucketlist !== event.target.innerText) (
      dispatch(change(event.target.innerText))
    )
  }

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
                <div key={index} style={{display: "flex", alignItems: "center"}}>
                  <ListItemButton
                  onClick={changeBucketlist}
                    sx={{
                      "&: hover": {
                        backgroundColor: selectedBucketlist === route.sidebarProps.displayText ? "unset" : colorConfigs.sidebar.hoverBg
                      },
                      backgroundColor: appState === item.state ? colorConfigs.sidebar.activeBg : "unset",
                      paddingY: "8px",
                      paddingX: "24px",
                      display: "inline-block",
                      width: selectedBucketlist === route.sidebarProps.displayText ? "200px" : "300px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    >
                    {route.sidebarProps.displayText}
                  </ListItemButton>
                  {selectedBucketlist === route.sidebarProps.displayText ? <SelectedButton text={"선택됨"}/> : null}
                </div>
              ) : null
            ))}
          </List>
        </Collapse>
      </>
      ) : null
  );
};
