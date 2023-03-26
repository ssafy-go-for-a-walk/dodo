import React from "react";
import styled from "styled-components";
import { MdSearch } from "react-icons/md";

const SearchBox = styled.div`
  width: 456px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 55px;
  background: #f1f3f5;
`;

const SearchInput = styled.input`
  width: 384px;
  height: 24px;
  border: none;
  background: #f1f3f5;
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

export default function SearchBar() {
  return (
    <SearchBox>
      <SearchInput />
      <SearchIcon>
        <MdSearch className="searchIcon" />
      </SearchIcon>
    </SearchBox>
  );
}
