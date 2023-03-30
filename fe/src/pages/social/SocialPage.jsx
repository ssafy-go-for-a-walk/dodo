import React, { useCallback, useEffect, useState } from "react";
import SocialItem from "./SocialItem";
import DATA from "./datas.json";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useSelector } from "react-redux";
import axios from "axios";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export default function SocialPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pages, setPages] = useState(1)
  const { user } = useSelector((state) => state);
  const [ref, inView] = useInView();
  const datas = DATA.datas;

  const getItems = useCallback(async () => {
    setLoading(true);
    await axios
    .get("https://j8b104.p.ssafy.io/api/social/bucketlists", {
      headers: {
        Authorization: `Bearer ${user.value.token}`,
      },
    })
    .then(res => {
      setPages(pre => pre + 1)
      console.log(res.data)
    })
    setItems(pre => [...pre, ...datas]);
    setLoading(false);
  }, [datas, user]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  useEffect(() => {
    if (inView && !loading) {
      getItems();
    }
  }, [inView, loading, getItems]);

  return (
    <Div>
      {console.log(pages)}
      {items.length !== 0 ? items.map((data, index) => <SocialItem data={data} key={index} />) : null}
      <RefreshIcon ref={ref} />
    </Div>
  );
}
