import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import ShareDiaryCard from "./ShareDiaryCard";
import Masonry from "@mui/lab/Masonry";
import axios from "axios";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";

const Div = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  cursor: default;
`;

export default function ManageDiary(props) {
  const [diaries, setDiaries] = useState([]);
  const [paging, setPaging] = useState({ page: 0, last: false });
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const { token } = props;

  const getDiaries = useCallback(async () => {
    setLoading(true);
    const params = { page: paging.page };
    await axios
      .get(`https://j8b104.p.ssafy.io/api/bucketlists/share/${token}/diaries`, {
        params: params,
      })
      .then(res => {
        const resData = res.data.data;
        setDiaries(pre => [...pre, ...resData.content]);
        setPaging({ page: resData.number + 1, last: resData.last });
      })
      .catch(err => console.log(err));
    setLoading(false);
  }, [token, paging.page]);

  useEffect(() => {
    if (inView && !paging.last && !loading) {
      getDiaries();
    }
  }, [inView, paging, loading, getDiaries]);

  return (
    <Div>
      {Array.isArray(diaries) && (
        <Masonry columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
          {diaries.map(diary => (
            <ShareDiaryCard diary={diary} key={diary.seq} loading="lazy" />
          ))}
        </Masonry>
      )}
      {!paging.last && !loading && <RefreshIcon ref={ref} />}
    </Div>
  );
}
