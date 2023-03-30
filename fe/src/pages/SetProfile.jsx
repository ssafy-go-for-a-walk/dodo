import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
import axios from "axios";
import FormData from 'form-data';
import { useDispatch } from "react-redux";
import { profile } from "../redux/user";

const TopDiv = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 10%;
`

const Div = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const UserImg = styled.img`
	margin-top: 24px;
	height: 200px;
  width: 200px;
  border-radius: 100px;
	border:1px solid #9A9A9A;
`

const NicknameInputBox = styled.input`
	&:focus {
		outline: none;
	}
	&::placeholder {
		color: #868E96;
	}
	margin-top: 32px;
	width: 296px;
	font-size: 20px;
	text-align: center;
	border: none;
	color: #868E96;
	border-bottom: 1px solid #CED4DA;
`

const CheckNickname = styled.div`
	display: flex;
	width: 296px;
	align-items: center;
	justify-content: space-between;
`

const Guide = styled.p`
	margin: 0px;
	font-size: 16px;
`

const SubmitButton = styled.div`
	&:hover {
		cursor: pointer;
	}
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 60px;
	border-radius: 16px;
	width: 370px;
	height: 67px;
	background-color: #1C9BFF;
	color: white;
	font-size: 24px;
	font-weight: 700;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`

const addStyle = {
	position: "relative",
	left: "-25px",
	color: "#9A9A9A",
	"&:hover" : {
		cursor: "pointer"
	}
}

export default function SetProfile() {
	const { user } = useSelector((state) => state)
	const [checkNickname, setCheckNickname] = useState(true)
	const [form, setForm] = useState({
		nickname: "",
		userImg: user.value.loginUserImg,
		imageConfirm: null,
	})
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const photoInput = useRef();
	const sendSurvey = useCallback(async () => {
    await axios
      .post("https://j8b104.p.ssafy.io/api/survey", {"preferences": user.survey}, {
				headers: {
					Authorization: `Bearer ${user.value.token}`,
				},
			})
	}, [user])
	useEffect(() => {
		sendSurvey();
	}, [sendSurvey])
	const completeSignUp = () => {
		if (form.nickname.length === 0) {
			alert("닉네임을 입력하세요")
		} else if (!checkNickname) {
			alert("이미 존재하는 닉네임입니다")
		} else {
			const formData = new FormData();
			const data = JSON.stringify({
				"nickname": form.nickname,
			})
			if (form.imageConfirm !== null) {
				formData.append("profileImage", form.imageConfirm)
			}
			formData.append("data", data)
			axios
      .post("https://j8b104.p.ssafy.io/api/users", formData, {
        headers: {
          Authorization: `Bearer ${user.value.token}`,
					'Content-Type': 'multipart/form-data',
        },
      })
			.then(() => {
				const data = {
					loginUserImg: form.userImg,
					loginUserNickname: form.nickname,
				}
				dispatch(profile(data))
				navigate("/")
			})
			.catch(err => console.log(err))
		}
	}
	const changeNickname = (eve) => {
		setForm({...form, nickname: eve.target.value})
		if (eve.target.value.length === 0) {
			setCheckNickname(true)
			return
		}
		axios
		.get("https://j8b104.p.ssafy.io/api/users/check/nickname", {
			headers: {
				Authorization: `Bearer ${user.value.token}`,
			},
			params: {
				nn: eve.target.value,
			}
		})
		.then(res => {
			setCheckNickname(res.data.data.isAvailable)
		})
	}
	const imgUpload = (eve) => {
		setForm({...form, userImg: URL.createObjectURL(eve.target.files[0]), imageConfirm: eve.target.files[0]});
	}
	return (
		<TopDiv>
			<Div>
				<div style={{fontWeight: "700", fontSize: "20px"}}>
					프로필 설정
				</div>
				<div>
					<UserImg
						src={form.userImg}
						alt="#"
					/>
					<input 
            type="file" 
            accept="image/jpg, image/jpeg, image/png" 
            multiple 
            ref={photoInput}
            style={{display: 'none'}} 
						onChange={imgUpload}
          />
					<BrightnessHighIcon sx={addStyle} onClick={() => {photoInput.current.click()}}/>
				</div>
				<NicknameInputBox
					onChange={changeNickname}
					value={form.nickname}
					maxLength={8}
					type="text"
					placeholder="닉네임을 입력해주세요"
				/>
				<CheckNickname>
					<Guide style={{color: "#FF0000"}}>
						{checkNickname ? "" : "이미 존재하는 닉네임입니다." }
					</Guide>
					<Guide style={{color: "#868E96"}}>
					{form.nickname.length} / 8자
					</Guide>
				</CheckNickname>
				<SubmitButton onClick={completeSignUp}>
					다음
				</SubmitButton>
			</Div>
		</TopDiv>
	)
}