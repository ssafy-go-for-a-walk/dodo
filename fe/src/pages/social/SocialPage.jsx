import React, { useCallback, useEffect, useState } from "react";
import SocialItem from "./SocialItem";
import DATA from "./datas.json";
import styled from "styled-components";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

export default function SocialPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const datas = DATA.datas;

  const getItems = useCallback(async () => {
    setLoading(true);
    setItems(pre => [...pre, ...datas]);
    setLoading(false);
  }, [datas]);

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
      {items.length !== 0 ? items.map((data, index) => <SocialItem data={data} key={index} />) : null}
      <RefreshIcon ref={ref} />
    </Div>
  );
}
