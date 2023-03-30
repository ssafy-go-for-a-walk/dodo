import React, { useState } from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";
import SearchBucket from "./SearchBucket";
import axios from "axios";
import { useSelector } from "react-redux";

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
  &::-webkit-scrollbar {
    display: none;
  }
  position: absolute;
  z-index: 10;
  top: 36px;
  background: #ffffff;
`;

export default function SearchBar(props) {
  const [buckets, setBuckets] = useState([]);
  const [value, setValue] = useState("");
  const { user } = useSelector(state => state);
  const bucketListId = user.value.selectedBucketlist.pk;

  const bucketSearch = event => {
    setValue(event.target.value);
    if (event.target.value.length > 0) {
      const params = { q: event.target.value, bucketlist: bucketListId };
      axios
        .get("https://j8b104.p.ssafy.io/api/buckets/search", {
          params: params,
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
        })
        .then(res => setBuckets(res.data.data.content))
        .catch(err => console.log(err));
    } else setBuckets([]);
  };

  const onKeyPress = event => {
    if (event.key === "Enter") {
      search();
    }
  };

  const search = () => {
    props.search(buckets);
    resetValue();
  };

  const resetValue = () => {
    setValue("");
    setBuckets([]);
  };

  return (
    <SearchBox>
      <InputBox>
        <SearchInput onChange={bucketSearch} value={value} onKeyPress={onKeyPress} onBlur={resetValue} />
        <SearchIcon onClick={search}>
          <MdSearch className="searchIcon" />
        </SearchIcon>
      </InputBox>
      <SearchResult>{buckets.legnth !== 0 && buckets.map(bucket => <SearchBucket bucket={bucket} key={bucket.publicBucketSeq} />)}</SearchResult>
    </SearchBox>
  );
}
