import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { changeListInfo, deleteBucketlist } from "../../redux/user";
import axios from "axios";
import styled from "styled-components";
import FullButton from "../../components/common/button/FullButton";
import HalfButton from "../../components/common/button/HalfButton";
import DeleteButton from "../../components/common/button/DeleteButton";
import BrightnessHighIcon from "@mui/icons-material/BrightnessHigh";
import Modal from "react-modal";
import CodeModal from "../../components/common/modal/CodeModal";
import CodeModalStyle from "../../components/common/modal/CodeModalStyle";

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
`;

const BucketImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50px;
`;

const BucketTitle = styled.div`
  width: 80%;
  max-width: 528px;
  height: 32px;
  margin: 40px 0;
  display: flex;
  justify-content: space-between;
`;

const TitleLadel = styled.label`
  width: 72px;
  text-align: center;
  font-size: 24px;
  color: #868e96;
  margin-right: 16px;
`;

const TitleInput = styled.input`
  width: 440px;
  font-size: 24px;
  border: none;
  border-bottom: 1px solid #ced4da;
  text-align: center;
  &:focus {
    outline: none;
  }
`;

const HalfButtons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  max-width: 528px;
`;

const addStyle = {
  fontSize: "32px",
  color: "#9A9A9A",
  "&:hover": {
    cursor: "pointer",
  },
};

export default function ManageSetting() {
  const { user } = useSelector(state => state);
  const info = user.bucketList.info;
  const userToken = user.value.token;
  const listId = info.seq;
  const [bucketListInfo, setBucketListInfo] = useState({
    title: info.title,
    image: info.image,
    imageConfirm: null,
    isPublic: info.isPublic,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const photoInput = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setBucketListInfo({
      title: info.title,
      image: info.image,
      imageConfirm: null,
      isPublic: info.isPublic,
    });
  }, [info]);

  const changeImage = event => {
    setBucketListInfo({ ...bucketListInfo, image: URL.createObjectURL(event.target.files[0]), imageConfirm: event.target.files[0] });
  };
  const changeTitle = event => {
    setBucketListInfo({ ...bucketListInfo, title: event.target.value });
  };
  const saveSetting = isPublic => {
    setBucketListInfo({ ...bucketListInfo, isPublic: isPublic });
    if (bucketListInfo.title !== info.title || bucketListInfo.imageConfirm !== null || isPublic !== info.isPublic) {
      const formData = new FormData();
      const data = JSON.stringify({
        title: bucketListInfo.title,
        isPublic: isPublic,
      });
      formData.append("file", bucketListInfo.imageConfirm);
      formData.append("bucketlistinfo", data);
      axios
        .patch(`https://j8b104.p.ssafy.io/api/bucketlists/${listId}`, formData, {
          headers: {
            Authorization: `Bearer ${userToken}`,
            "Content-Type": "multipart/form-data",
          },
        })
        .then(res => dispatch(changeListInfo(res.data.data)))
        .catch(err => console.log(err));
    }
  };
  const createCode = () => {
    axios
      .post(
        `https://j8b104.p.ssafy.io/api/bucketlists/${listId}/invite`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      )
      .then(res => {
        setCode(res.data.data.inviteToken);
        setIsOpen(true);
      })
      .catch(err => console.log(err));
  };
  const deleteList = () => {
    axios
      .delete(`https://j8b104.p.ssafy.io/api/bucketlists/${listId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(() => {
        dispatch(deleteBucketlist());
        navigate("/");
      })
      .catch(err => {
        const errMessage = err.response.data.message;
        alert(errMessage);
      });
  };
  const saveImage = () => {
    const imageUrl = user.myBucketlist;
    const link = window.document.createElement("a");
    link.download = "my_bucketlist.png";
    link.href = imageUrl;
    link.click();
  };
  return (
    <Settings>
      <div>
        <BucketImg src={bucketListInfo.image} />
        <input type="file" accept="image/jpg, image/jpeg, image/png" multiple ref={photoInput} style={{ display: "none" }} onChange={changeImage} />
        <BrightnessHighIcon
          sx={addStyle}
          onClick={() => {
            photoInput.current.click();
          }}
        />
      </div>
      <BucketTitle>
        <TitleLadel>제목</TitleLadel>
        <TitleInput value={bucketListInfo.title} onChange={changeTitle} />
      </BucketTitle>
      <FullButton propFunction={() => saveSetting(info.isPublic)} content="저장하기" />
      <FullButton isPublic={info.isPublic} content="Private / Public" propFunction={() => saveSetting(!info.isPublic)} />
      {info.type === "GROUP" && <FullButton propFunction={createCode} content="참여코드 생성하기" />}
      <HalfButtons>
        <HalfButton>공유하기</HalfButton>
        <HalfButton onClick={saveImage}>내보내기</HalfButton>
      </HalfButtons>
      <DeleteButton onClick={deleteList} />
      <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={CodeModalStyle} ariaHideApp={false}>
        <CodeModal closeModal={() => setIsOpen(false)} code={code} />
      </Modal>
    </Settings>
  );
}
