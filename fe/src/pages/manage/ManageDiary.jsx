import React from "react";
import styled from "styled-components";
import DiaryCard from "./DiaryCard";
import Masonry from "@mui/lab/Masonry";

const Div = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 16px;
`;

const diaries = [
  {
    id: 1,
    imoge: "",
    title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    category: "여행",
    created: "2023.03.28",
    image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/smartphone-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 2,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "",
    content: "aaa",
  },
  {
    id: 3,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/smartphone-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 4,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "",
    content: "asfafa",
  },
  {
    id: 5,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/smartphone-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafsfdsfdafsfafaadvavfdfdasfffffffffffdddddddfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  },
  {
    id: 6,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/smartphone-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    content: "faafafa",
  },
  {
    id: 7,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "",
    content:
      "aaaaaaaasdaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 8,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/smartphone-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    content: "asdadffavavasvaavav",
  },
  {
    id: 9,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 10,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/smartphone-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 11,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 12,
    imoge: "",
    title: "aaa",
    category: "여행",
    created: "2023.03.28",
    image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/smartphone-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    content:
      "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
  },
];

export default function ManageDiary() {
  return (
    <Div>
      <Masonry columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
        {diaries.map(item => (
          <DiaryCard diary={item} key={item.id} loading="lazy" />
        ))}
      </Masonry>
    </Div>
  );
}
