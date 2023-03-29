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
  height: 560px;
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

export default function SearchBar() {
  const [buckets, setBuckets] = useState([]);
  const [value, setValue] = useState("");
  const { user } = useSelector(state => state);

  const searchBucket = event => {
    setValue(event.target.value);
    const params = { q: event.target.value };
    axios
      .post(
        "https://j8b104.p.ssafy.io/api/buckets/search",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.value.token}`,
          },
          params: params,
        },
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  return (
    <SearchBox>
      <InputBox>
        <SearchInput onChange={searchBucket} value={value} />
        <SearchIcon>
          <MdSearch className="searchIcon" />
        </SearchIcon>
      </InputBox>
      <SearchResult></SearchResult>
    </SearchBox>
  );
}
