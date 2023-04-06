import styled from "styled-components";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import Banner from "./Banner";
import Category from "./Category";
import SearchBar from "./SearchBar";
import RecommBucket from "./RecommBucket";
import cate from "../../configs/categoryConfig";
import SlideUp from "../../components/common/button/SlideUp";
import RefreshIcon from "@mui/icons-material/Refresh";
import { CircularProgress } from "@mui/material";
import { lightBlue } from "@mui/material/colors";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;

const Categorys = styled.div`
  width: 708px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 32px;
`;

export default function SearchPage() {
  const [selectCate, setSelectCate] = useState("전체");
  const [searchValue, setSearchValue] = useState("");
  const [paging, setPaging] = useState({ last: false, page: 0 });
  const [buckets, setBuckets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const { user } = useSelector(state => state);
  const userToken = user.value.token;
  const listId = user.value.selectedBucketlist.pk;

  const changeCate = useCallback(
    async categoryName => {
      const params = { category: categoryName };
      setLoading(true);
      setSelectCate(categoryName);
      setBuckets([]);
      await axios
        .get("https://j8b104.p.ssafy.io/api/recomm/buckets", {
          params: params,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          const resData = res.data.data;
          setBuckets(resData.content);
          setPaging({ page: resData.number + 1, last: resData.last });
        });
      setLoading(false);
    },
    [userToken],
  );

  const search = data => {
    setLoading(true);
    setBuckets(data.buckets);
    setSearchValue(data.value);
    setPaging(data.paging);
    setSelectCate(null);
    setLoading(false);
  };

  useEffect(() => {
    changeCate(selectCate);
  }, [changeCate, selectCate]);

  const addBuckets = useCallback(async () => {
    setLoading(true);
    if (selectCate !== null) {
      const params = { category: selectCate, page: paging.page };
      await axios
        .get("https://j8b104.p.ssafy.io/api/recomm/buckets", {
          params: params,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          const resData = res.data.data;
          setBuckets(pre => [...pre, ...resData.content]);
          setPaging({ page: resData.number + 1, last: resData.last });
        });
    } else {
      const params = { q: searchValue, bucketlist: listId, page: paging.page };
      await axios
        .get("https://j8b104.p.ssafy.io/api/buckets/search", {
          params: params,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          const resData = res.data.data;
          setBuckets(pre => [...pre, ...resData.content]);
          setPaging({ page: resData.number + 1, last: resData.last });
        });
    }
    setLoading(false);
  }, [selectCate, paging.page, userToken, listId, searchValue]);

  useEffect(() => {
    if (inView && !paging.last) {
      addBuckets();
    }
  }, [inView, paging.last, addBuckets]);

  return (
    <Div>
      <SearchBar search={search} />
      <Categorys>
        {cate.map(data => (
          <Category
            select={data.name === selectCate ? true : false}
            categoryName={data.name}
            categoryImg={data.image}
            key={data.name}
            propFunction={changeCate}
          />
        ))}
      </Categorys>
      {selectCate !== null && <Banner category={selectCate} />}
      {Array.isArray(buckets) && buckets.map(bucket => <RecommBucket bucket={bucket} key={bucket.publicBucketSeq} />)}
      {!paging.last && !loading && <RefreshIcon ref={ref} />}
      {loading && <CircularProgress sx={{ color: lightBlue[500] }} />}
      <SlideUp />
    </Div>
  );
}
