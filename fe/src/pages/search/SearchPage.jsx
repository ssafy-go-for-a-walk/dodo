import React, { useCallback, useEffect, useState } from "react";
// import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import SlideUp from "../../components/common/button/SlideUp";
import SearchBar from "./SearchBar";
import Banner from "./Banner";
import RecommBucket from "./RecommBucket";
import Category from "./Category";
import cate from "../../configs/categoryConfig";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "axios";
import { useSelector } from "react-redux";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categorys = styled.div`
  width: 708px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
`;

export default function SearchPage() {
  const [selectCate, setSelectCate] = useState("전체");
  // const [paging, setPaging] = useState({ last: false, number: 0 });
  const [buckets, setBuckets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ref] = useInView();
  // const [ref, inView] = useInView();
  const { user } = useSelector(state => state);
  const userToken = user.value.token;

  const changeCate = useCallback(
    async categoryName => {
      // if (!paging.last) {
      const params = { category: categoryName };
      // const params = { category: categoryName, page: paging.number };
      setLoading(true);
      axios
        .get("https://j8b104.p.ssafy.io/api/recomm/buckets", {
          params: params,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          setBuckets(res.data.data.content);
          // setPaging({last: res.data.data.last, number: res.data.data.number})
        })
        .catch(err => console.log(err));
      setSelectCate(categoryName);
      setLoading(false);
      // }
    },
    [userToken],
  );

  const search = buckets => {
    setLoading(true);
    setBuckets(buckets);
    setSelectCate("");
    setLoading(false);
  };

  useEffect(() => {
    changeCate(selectCate);
  }, [changeCate, selectCate]);

  // const addBuckets = useCallback(async () => {
  //
  // }, [datas]);

  // useEffect(() => {
  //   if (inView && !loading) {
  //     addBuckets();
  //   }
  // }, [inView, loading, getBuckets]);

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
      <Banner />
      {buckets.length !== 0 ? buckets.map(bucket => <RecommBucket bucket={bucket} key={bucket.publicBucketSeq} />) : null}
      {loading && <RefreshIcon ref={ref} />}
      <SlideUp />
    </Div>
  );
}
