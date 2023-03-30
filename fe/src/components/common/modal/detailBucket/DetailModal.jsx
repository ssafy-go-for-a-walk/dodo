import React, { useState } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import Tag from "../../bucket/Tag";
import { FcCalendar } from "react-icons/fc";
import { BsFlag } from "react-icons/bs";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import CategorySelect from "./CategorySelect";
import Diary from "./Diary";
import DiaryForm from "./DiaryForm";
import Picker from "emoji-picker-react";
// import axios from "axios";
// import { useSelector } from "react-redux";

const Modal = styled.div`
  display: flex;
  flex-direction: column;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 580px;
  height: 124px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #acabab;
  position: relative;
`;

const Head = styled.div`
  height: 48px;
  text-align: center;
  margin-bottom: 16px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const EmojiBtn = styled.img`
  width: 32px;
  cursor: pointer;
`;

const Emoji = styled.span`
  font-size: 24px;
  cursor: pointer;
`;

const EmojiPicker = styled.div`
  width: 60%;
  position: absolute;
  top: 50px;
  z-index: 1;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  width: 80%;
  text-align: start;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Detail = styled.div`
  display: flex;
  height: 32px;
  width: 100%;
`;

const Calendar = styled.div`
  font-size: 32px;
  margin-right: 8px;
`;

const SDatePicker = styled(DatePicker)`
  height: 32px;
  font-size: 16px;
  padding-top: 8px;
  cursor: pointer;
  border: none;
`;

const Map = styled.div`
  font-size: 24px;
  margin-right: 8px;
  color: #1c9bff;
  display: flex;
  align-items: center;
`;

const Place = styled.input`
  height: 32px;
  min-width: 300px;
  font-size: 16px;
  border: none;

  &:focus {
    outline: none;
    border-bottom: 1px solid #acabab;
  }
`;

const Content = styled.textarea`
  width: 580px;
  height: 184px;
  overflow: auto;
  border: none;
  border-bottom: 1px solid #acabab;
  text-align: center;
  font-size: 16px;
  margin-bottom: 24px;
`;

const Diaries = styled.div`
  width: 580px;
  height: 280px;
  overflow: auto;
`;

export default function GroupModal(props) {
  const bucket = props.bucket;
  const [endDate, setEndDate] = useState(bucket.dday !== null ? bucket.dday : new Date());
  const [location, setLocation] = useState(bucket.location !== null ? bucket.location : "");
  const [content, setContent] = useState(bucket.desc !== null ? bucket.desc : "");
  const [emoji, setEmoji] = useState(bucket.emoji);
  const [showPicker, setShowPicker] = useState(false);
  const [category, setCate] = useState(bucket.category !== null ? bucket.category.item : null);
  // const { user } = useSelector(state => state);
  // const userToken = user.value.token

  const onEmojiClick = emojiObject => {
    setEmoji(emojiObject.emoji);
    setShowPicker(false);
  };

  const categoryChange = cate => {
    setCate(cate);
    return;
  };

  const locationChange = event => {
    setLocation(event.target.value);
  };

  const contentChange = event => {
    setContent(event.target.value);
  };

  const closeDetailModal = () => {
    props.closeModal();
  };

  return (
    <Modal>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton>
          <CloseIcon style={{ color: "#1C9BFF", fontSize: "40px" }} onClick={closeDetailModal} />
        </IconButton>
      </div>
      <Div>
        <Header>
          <Head>
            {emoji === null ? (
              <EmojiBtn src="https://icons.getbootstrap.com/assets/icons/emoji-smile.svg" onClick={() => setShowPicker(val => !val)} />
            ) : (
              <Emoji role="img" onClick={() => setShowPicker(val => !val)}>
                {emoji}
              </Emoji>
            )}
            <Title>{bucket.title}</Title>
            {category !== null ? <Tag category={category} /> : <CategorySelect category={category} propFunction={categoryChange} />}
          </Head>
          {showPicker && (
            <EmojiPicker>
              <Picker pickerStyle={{ width: "100%" }} onEmojiClick={onEmojiClick} />
            </EmojiPicker>
          )}
          <Detail>
            <Calendar>
              <FcCalendar />
            </Calendar>
            <SDatePicker
              locale={ko}
              dateFormat="yyyy.MM.dd"
              selected={endDate}
              onChange={date => setEndDate(date)}
              selectsEnd
              endDate={endDate}
              minDate={new Date()}
            />
            <Map>
              <BsFlag />
            </Map>
            <Place value={location} onChange={locationChange} />
          </Detail>
        </Header>
        <Content value={content} onChange={contentChange} />
        <Diaries>
          <Diary />
        </Diaries>
        <DiaryForm />
      </Div>
    </Modal>
  );
}
