import React, { useCallback, useEffect, useState } from "react";
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
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { reBucketList } from "../../../../redux/user";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  font-family: "pretendard";
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  width: 580px;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 8px;
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
  border-radius: 8px;
  &:hover {
    transform: scale(1.1);
    background: #f1f3f5;
  }
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
  font-size: 30px;
  margin-right: 8px;
`;

const SDatePicker = styled(DatePicker)`
  height: 32px;
  font-size: 16px;
  padding-top: 8px;
  cursor: pointer;
  border: none;
  &:hover {
    border: 1px solid black;
    border-radius: 8px;
  }
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
  padding-top: 8px;
  font-family: "pretendard";
  &:focus,
  :hover {
    outline: none;
    border-bottom: 1px solid #acabab;
  }
`;

const Content = styled.textarea`
  width: 580px;
  height: 156px;
  overflow: auto;
  border: none;
  border: 1px solid #acabab;
  text-align: center;
  font-size: 16px;
  margin-bottom: 8px;
  overflow: hidden;
  resize: none;
  font-family: "pretendard";
`;

const Diaries = styled.div`
  width: 580px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function GroupModal(props) {
  const bucket = props.bucket;
  const [emoji, setEmoji] = useState(bucket.emoji);
  const [endDate, setEndDate] = useState(bucket.dday !== null ? new Date(bucket.dday) : new Date());
  const [location, setLocation] = useState(bucket.location !== null ? bucket.location : "");
  const [content, setContent] = useState(bucket.desc !== null ? bucket.desc : "");
  const [category, setCate] = useState(bucket.category !== null ? bucket.category.item : null);
  const [showPicker, setShowPicker] = useState(false);
  const [diaries, setDiaries] = useState([]);
  const [paging, setPaging] = useState({ page: 0, last: false });
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state);
  const userToken = user.value.token;
  const dispatch = useDispatch();
  const [ref, inView] = useInView();

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
    if (emoji !== bucket.emoji || endDate !== bucket.dday || location !== bucket.location || content !== bucket.desc || category !== bucket.category) {
      const data = {
        emoji: emoji,
        dDay: endDate,
        location: location,
        desc: content,
        category: category,
      };
      axios
        .patch(`https://j8b104.p.ssafy.io/api/buckets/${bucket.seq}`, data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          dispatch(reBucketList(res.data.data));
        });
    }
    props.closeModal();
  };

  const changeDiaries = resData => {
    setDiaries(resData.content);
    setPaging({ page: resData.number + 1, last: resData.last });
  };

  const moreDiaries = useCallback(async () => {
    setLoading(true);
    const params = { page: paging.page };
    await axios
      .get(`https://j8b104.p.ssafy.io/api/buckets/${bucket.seq}/diaries`, {
        params: params,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        const resData = res.data.data;
        setDiaries(pre => [...pre, ...resData.content]);
        setPaging({ page: resData.number + 1, last: resData.last });
      });
    setLoading(false);
  }, [paging.page, bucket.seq, userToken]);

  useEffect(() => {
    if (inView && !paging.last) {
      moreDiaries();
    }
  }, [inView, paging, moreDiaries]);

  return (
    <Modal>
      <div style={{ display: "flex", justifyContent: "end" }}>
        <IconButton sx={{ width: "40px", right: "10ox", left: "auto" }} onClick={closeDetailModal}>
          <CloseIcon style={{ color: "#1C9BFF" }} />
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
            <SDatePicker locale={ko} dateFormat="yyyy.MM.dd" selected={endDate} onChange={date => setEndDate(date)} endDate={endDate} minDate={new Date()} />
            <Map>
              <BsFlag />
            </Map>
            <Place value={location} onChange={locationChange} placeholder="어디서 할까요?" />
          </Detail>
        </Header>
        <Content defaultValue={content} onChange={contentChange} placeholder="버킷에 대한 상세 내용을 입력해주세요." />
        <Diaries>
          {Array.isArray(diaries) && diaries.map(diary => <Diary diary={diary} key={diary.seq} />)}
          {!paging.last && !loading && <RefreshIcon sx={{ marginTop: "8px" }} ref={ref} />}
        </Diaries>
        <DiaryForm bucketId={bucket.seq} changeDiaries={changeDiaries} />
      </Div>
    </Modal>
  );
}
