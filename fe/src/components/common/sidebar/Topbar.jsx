import { AppBar, Toolbar } from "@mui/material";
import colorConfigs from "../../../configs/colorConfigs";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useSelector } from "react-redux";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import styled from "styled-components";
import { useState } from "react";
import Modal from "react-modal";
import ModalStyle from "./TopbarModalStyle";
import TopbarModal from "./TopbarModal";
import ProfileModalStyle from "./ProfileModalStyle";
import SettingProfile from "./modal/SettingProfile";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import logo from "../../../assets/images/TopbarLogo.png"
import { useNavigate } from "react-router-dom";

const TopDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Div = styled.div`
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

const Img = styled.img`
  margin-right: 8px;
  height: 40px;
`;

export default function Topbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const { user } = useSelector(state => state);
	const navigate = useNavigate();
  const open = props.isOpen
  const userImg = user.value.loginUserImg;
  const userNickname = user.value.loginUserNickname;
  console.log(user);
  const openSetup = () => {
    setIsOpen(bool => !bool);
  };
  const closeModal = () => {
    setIsOpen(false);
    setIsOpenProfile(true);
  };
  const closeProfileModal = () => {
    setIsOpenProfile(false);
  };
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar>
        <TopDiv>
          <Div>
            {open
            ? <ArrowBackIosNewIcon
              sx={{
                "&: hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                props.open();
              }}/> :<ReorderIcon
              sx={{
                "&: hover": {
                  cursor: "pointer",
                },
              }}
              onClick={() => {
                props.open();
              }}
              />}
              <Img
                onClick={() => {navigate("/")}}
                style={{ marginLeft: "8px", borderRadius: "8px"}}
                src={logo} alt="#"
              />
          </Div>
          <Div onClick={openSetup}>
            <Img style={{borderRadius: "100px"}} src={userImg} alt="#"/>
            {userNickname}
            <ExpandMoreOutlinedIcon />
          </Div>
        </TopDiv>
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={ModalStyle} ariaHideApp={false}>
          <TopbarModal closeModal={closeModal} />
        </Modal>
        <Modal
          isOpen={isOpenProfile}
          // onRequestClose={() => setIsOpenProfile(false)}
          style={ProfileModalStyle}
          ariaHideApp={false}
        >
          <SettingProfile closeProfileModal={closeProfileModal} signUp={false} />
        </Modal>
      </Toolbar>
    </AppBar>
  );
}
