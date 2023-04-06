import { AppBar, Toolbar } from "@mui/material";
import colorConfigs from "../../../configs/colorConfigs";
import ReorderIcon from "@mui/icons-material/Reorder";
import { useSelector } from "react-redux";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import styled from "styled-components";
import { useCallback, useState } from "react";
import Modal from "react-modal";
import ModalStyle from "./TopbarModalStyle";
import TopbarModal from "./TopbarModal";
import ProfileModalStyle from "./ProfileModalStyle";
import SettingProfile from "./modal/SettingProfile";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import logo from "../../../assets/images/TopbarLogo.png";
import { useNavigate } from "react-router-dom";

const TopDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
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
  const open = props.isOpen;
  const userImg = user.value.loginUserImg;
  const userNickname = user.value.loginUserNickname;
  const openSetup = () => {
    setIsOpen(true);
    lockScroll();
  };
  const closeModal = () => {
    setIsOpen(false);
    setIsOpenProfile(true);
  };
  const closeProfileModal = () => {
    setIsOpenProfile(false);
    openScroll();
  };
  const lockScroll = useCallback(() => {
    const scrollPosition = window.pageYOffset;
    document.body.style.overflow = "scroll";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
  }, []);

  const openScroll = useCallback(() => {
    const scrollPosition = window.pageYOffset;
    document.body.style.removeProperty("overflow");
    document.body.style.removeProperty("position");
    document.body.style.removeProperty("top");
    document.body.style.removeProperty("width");
    window.scrollTo(0, scrollPosition);
  }, []);
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
            {open ? (
              <ArrowBackIosNewIcon
                sx={{
                  "&: hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  props.open();
                }}
              />
            ) : (
              <ReorderIcon
                sx={{
                  "&: hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => {
                  props.open();
                }}
              />
            )}
            <Img
              onClick={() => {
                navigate("/");
              }}
              style={{ marginLeft: "8px", borderRadius: "8px" }}
              src={logo}
              alt="#"
            />
          </Div>
          <Div onClick={openSetup}>
            <Img style={{ width: "40px", borderRadius: "100px" }} src={userImg} alt="#" />
            {userNickname}
            <ExpandMoreOutlinedIcon />
          </Div>
        </TopDiv>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
            openScroll();
          }}
          style={ModalStyle}
          ariaHideApp={false}
        >
          <TopbarModal closeModal={closeModal} />
        </Modal>
        <Modal isOpen={isOpenProfile} style={ProfileModalStyle} ariaHideApp={false}>
          <SettingProfile closeProfileModal={closeProfileModal} signUp={false} />
        </Modal>
      </Toolbar>
    </AppBar>
  );
}
