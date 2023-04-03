import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import SearchBucket from "./SearchBucket";
import axios from "axios";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import RefreshIcon from "@mui/icons-material/Refresh";

const SearchBox = styled.div`
  width: 80%;
  max-width: 456px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
  position: relative;
`;

const InputBox = styled.div`
  width: 100%;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
`;

const SearchInput = styled.input`
  width: 85%;
  height: 24px;
  border: none;
  margin-left: 16px;
  &:focus {
    outline: none;
  }
`;

const SearchIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 16px;

  .searchIcon {
    font-size: 24px;
    color: #5f5f5f;
  }
`;

const SearchResult = styled.div`
  width: 100%;
  max-height: 560px;
  border-radius: 8px;
  overflow: scroll;
  position: absolute;
  z-index: 10;
  top: 36px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function SearchBar(props) {
  const [buckets, setBuckets] = useState([]);
  const [value, setValue] = useState("");
  const [paging, setPaging] = useState({ page: 0, last: false });
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();
  const { user } = useSelector(state => state);
  const listId = user.value.selectedBucketlist.pk;
  const userToken = user.value.token;

  const getSearch = event => {
    setLoading(true);
    const searchValue = event.target.value;
    setValue(searchValue);
    if (searchValue.length > 0) {
      const params = { q: searchValue, bucketlist: listId };
      axios
        .get("https://j8b104.p.ssafy.io/api/buckets/search", {
          params: params,
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then(res => {
          const resData = res.data.data;
          setBuckets(resData.content);
          setPaging({ page: resData.number + 1, last: resData.last });
        })
        .catch(err => console.log(err));
    } else setBuckets([]);
  };

  const moreSearch = useCallback(async () => {
    setLoading(true);
    const params = { q: value, bucketlist: listId, page: paging.page };
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
      })
      .catch(err => console.log(err));
    setLoading(false);
  }, [listId, userToken, value, paging.page]);

  const onKeyPress = event => {
    if (event.key === "Enter") {
      search();
    }
  };

  const search = () => {
    const data = { buckets: buckets, value: value, paging: paging };
    props.search(data);
    resetValue();
  };

  const resetValue = () => {
    setValue("");
    setBuckets([]);
  };

  useEffect(() => {
    if (inView && !paging.last && value.length > 0) {
      moreSearch();
    } else if (value.length === 0) {
      setLoading(true);
    }
  }, [inView, paging, moreSearch, value]);

  return (
    <SearchBox>
      <InputBox>
        <SearchInput onChange={getSearch} value={value} onKeyPress={onKeyPress} onBlur={resetValue} />
        <SearchIcon onClick={search}>
          <MdSearch className="searchIcon" />
        </SearchIcon>
      </InputBox>
      <SearchResult>
        {Array.isArray(buckets) && buckets.map(bucket => <SearchBucket bucket={bucket} key={bucket.publicBucketSeq} />)}
        {!paging.last && !loading && <RefreshIcon ref={ref} />}
      </SearchResult>
    </SearchBox>
  );
}
