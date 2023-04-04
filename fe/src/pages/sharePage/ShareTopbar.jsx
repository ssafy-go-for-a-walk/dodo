import { AppBar } from "@mui/material";
import styled from "styled-components";
import colorConfigs from "../../configs/colorConfigs";
import logo from "../../assets/images/logo.png";

const LogInButton = styled.button`
  border: none;
  background: none;
  color: #ffffff;
  font-size: 24px;
  margin-right: 16px;
  cursor: pointer;
  &:hover {
    font-weight: bold;
  }
`;

const LogoImg = styled.img`
  height: 100%;
`;

export default function ShareTopbar() {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        height: "64px",
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <LogoImg src={logo} />
      <LogInButton onClick={() => window.location.replace("https://j8b104.p.ssafy.io/api/oauth2/authorization/kakao", "_blank")}>로그인</LogInButton>
    </AppBar>
  );
}
