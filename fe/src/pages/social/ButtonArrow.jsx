import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
`;

export default function ButtonArrow(props) {
  return (
    <Div onClick={props.clickEvent}>
      <ExpandMoreIcon sx={{ width: "40px", height: "40px" }} />
    </Div>
  );
}
