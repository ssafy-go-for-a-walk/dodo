import { ListItemButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { change } from "../../../redux/user";
import SelectedButton from "./SelectedButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
`;

const PTag = styled.p`
  margin: 0px 8px 0px 0px;
  width: ${props => (props.selected ? "200px" : "300px")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function SidebarBuckitlists(props) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state);
  const navigate = useNavigate();
  const info = props.data;
  const selected = info.seq === user.value.selectedBucketlist.pk;
  const changeBucketlist = () => {
    if (!selected) {
      dispatch(
        change({
          pk: info.seq,
          title: info.title,
          completeRate: info.completeRate,
        }),
      );
    }
    navigate("/manage");
  };
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <ListItemButton
        onClick={changeBucketlist}
        sx={{
          paddingY: "8px",
          paddingLeft: "24px",
          paddingRight: "8px",
          display: "inline-block",
        }}
      >
        <Div>
          <PTag selected={selected}>{info.title}</PTag>
          <div>{selected ? <SelectedButton /> : null}</div>
        </Div>
      </ListItemButton>
    </div>
  );
}
