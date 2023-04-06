import styled from "styled-components";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useDispatch, useSelector } from "react-redux";
import { changeSidebarIsOpen } from "../../../redux/user";

const Button = styled.div`
  position: fixed;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 50px;
  top: 50vh;
	border-radius: 0 8px 8px 0;
	background-color: ${props => props.open ? "rgb(251 251 250)" : "rgb(28 155 255)"};
  left: ${props => props.open ? "300px" : "0px"};
	transition: all 0.5s ease-out;
  z-index: 9999;
`

export default function SidebarController() {
	const { user } = useSelector(state => state)
  const dispatch = useDispatch();
  const open = user.sidebarIsOpen
  const controlSidebar = () => {
    dispatch(changeSidebarIsOpen());
  };
	return (
		<Button open={open}>
		{open ? (
			<ArrowBackIosNewIcon
				sx={{
					color: "#868E96",
					"&: hover": {
						cursor: "pointer",
					},
				}}
				onClick={() => {
					controlSidebar();
				}}
			/>
		) : (
			<ArrowForwardIosIcon
				sx={{
					color: "white",
					"&: hover": {
						cursor: "pointer",
					},
				}}
				onClick={() => {
					controlSidebar();
				}}
			/>
		)}
	</Button>
	)
}