import { AppBar, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import ReorderIcon from '@mui/icons-material/Reorder';
// import { useSelector } from "react-redux";
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import styled from "styled-components"

const TopDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`

const Div = styled.div`
  display: flex;
  align-items: center;
`

const UserImg = styled.img`
  margin-right: 8px;
	height: 40px;
  width: 40px;
  border-radius: 100px;
`

export default function Topbar() {
  // const { user } = useSelector((state) => state);
  const userNickname = "짱구는 못말려"
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color
      }}
    >
      <Toolbar>
        <TopDiv>
          <ReorderIcon sx={{
            "&: hover": {
              cursor: "pointer",
            },
          }}/>
          <Div>
            <UserImg
              src="https://img.danawa.com/prod_img/500000/017/350/img/13350017_1.jpg?shrink=330:*&_v=20210224095944"
              alt="#"
            />
            {/* {console.log(user.value.loginUserNickname, "sjp2")} */}
            {userNickname}
            <ExpandMoreOutlinedIcon/>
          </Div>
        </TopDiv>
      </Toolbar>
    </AppBar>
  );
};