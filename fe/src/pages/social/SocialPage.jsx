import React, { useCallback, useEffect, useState } from "react";
import SocialItem from "./SocialItem";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";
import axios from "axios";
import SlideUp from "../../components/common/button/SlideUp";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export default function SocialPage() {
  const [items, setItems] = useState([]);
  const [pages, setPages] = useState(0)
  const [last, setLast] = useState(false)
  const { user } = useSelector((state) => state);
  const [ref, inView] = useInView();

  const getItems = useCallback(async () => {
    await axios
    .get("https://j8b104.p.ssafy.io/api/social/bucketlists", {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
      params: {
        page: pages,
        size: 2,
      },
    })
    .then(res => {
      setItems(pre => [...pre, ...res.data.data.content]);
      if (res.data.data.last) {
        setLast(true)
      }
    })
  }, [user, pages]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (inView) { 
      setPages(pre => pre + 1)
    }
  }, [inView, setPages]);

  return (
    <Div>
      {items.length !== 0 ? items.map((data, index) => <SocialItem data={data} key={index} />) : null}
      {last ? null: <RefreshIcon ref={ref} />}
      <SlideUp />
    </Div>
  );
}
