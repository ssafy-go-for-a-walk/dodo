import React from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/user";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
	display: flex;
	align-items: center;
	&:hover {
		cursor: pointer;
		font-weight: 1000;
	}
`

const PTag = styled.p`
	margin: 8px 0px 8px 8px;
`
export default function Logout() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const logOut = () => {
		dispatch(logout());
		navigate('/survey');
	}
	return (
		<Div onClick={logOut}>
			<LogoutIcon color="disabled"/>
			<PTag>
				로그아웃
			</PTag>
		</Div>
	)
}