import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import DiaryCard from "./DiaryCard";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const NoDiaries = styled.div`
  font-size: 40px;
  cursor: default;
`;

export default function ManageDiary() {
  const [diaries, setDiaries] = useState([]);
  const [paging, setPaging] = useState({ page: 0, last: false });
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const { user } = useSelector(state => state);
  const listId = user.value.selectedBucketlist.pk;
  const userToken = user.value.token;

  const getDiaries = useCallback(async () => {
    setLoading(true);
    const params = { page: paging.page };
    await axios
      .get(`https://j8b104.p.ssafy.io/api/bucketlists/${listId}/diaries`, {
        params: params,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(res => {
        const resData = res.data.data;
        setDiaries(pre => [...pre, ...resData.content]);
        setPaging({ page: resData.number + 1, last: resData.last });
      })
      .catch(err => console.log(err));
    setLoading(false);
  }, [listId, userToken, paging.page]);

  useEffect(() => {
    if (inView && !paging.last) {
      getDiaries();
    }
  }, [inView, paging, getDiaries]);

  return (
    <Div>
      {Array.isArray(diaries) &&
        (diaries.length === 0 ? (
          <NoDiaries>경험일기를 작성해주세요.</NoDiaries>
        ) : (
          <Masonry columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
            {diaries.map(diary => (
              <DiaryCard diary={diary} key={diary.seq} loading="lazy" />
            ))}
          </Masonry>
        ))}
      {!paging.last && !loading && <RefreshIcon ref={ref} />}
    </Div>
  );
}
