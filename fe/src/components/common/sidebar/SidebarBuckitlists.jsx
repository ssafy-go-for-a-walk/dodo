import { ListItemButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { change } from "../../../redux/user";
import SelectedButton from "./SelectedButton";

export default function SidebarBuckitlists(props) {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state);
	const info = props.data;
	const selected = info.seq === user.value.selectedBucketlist.pk
	const changeBucketlist = () => {
		if (!selected) {
			dispatch(change({
				pk: info.seq,
				title: info.title,
				completeRate: info.completeRate,
			}))
		}
	}
	return (
		<div style={{display: "flex", alignItems: "center"}}>
			<ListItemButton
				onClick={changeBucketlist}
				sx={{
					paddingY: "8px",
					paddingX: "24px",
					display: "inline-block",
					width: selected ? "200px" : "300px",
					whiteSpace: "nowrap",
					overflow: "hidden",
					textOverflow: "ellipsis",
				}}
				>
				{info.title}
			</ListItemButton>
			{selected ? <SelectedButton text={"선택됨"}/> : null}
		</div>
	)
}