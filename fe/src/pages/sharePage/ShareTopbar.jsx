import { AppBar } from "@mui/material";
import styled from "styled-components";
import logo from "../../assets/images/TopbarLogo.png";
import { useNavigate } from "react-router";

const LoginDiv = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #757575;
`;

const LogInButton = styled.button`
  border: none;
  background: rgba(28, 155, 255, 0.2);
  height: 35px;
  padding: 0 8px;
  font-weight: 700;
  border-radius: 8px;
  margin-left: 16px;
  cursor: pointer;
  &:hover {
    background: rgba(28, 155, 255);
    color: #ffffff;
  }
`;

const LogoImg = styled.img`
  height: 70%;
  cursor: pointer;
  &:hover {
    opacity: 0.95;
  }
`;

export default function ShareTopbar() {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: "100%",
        height: "64px",
        boxShadow: "unset",
        backgroundColor: "#ffffff",
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "16px",
      }}
    >
      <LogoImg src={logo} onClick={() => navigate("/")} />
      <LoginDiv>
        <p style={{ cursor: "default" }}>✨ DoDo를 하러 가볼까요?</p>
        <LogInButton onClick={() => navigate("/survey")}>Do? Do!</LogInButton>
      </LoginDiv>
    </AppBar>
  );
}
