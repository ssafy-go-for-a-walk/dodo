import React, { useState } from "react";
// import React, { useCallback, useState } from "react";
import styled from "styled-components";
import ShareTopbar from "./ShareTopbar";
import ShareHeader from "./ShareHeader";
import ShareBucket from "./ShareBucket";
import ShareDiary from "./ShareDiary";
import Masonry from "@mui/lab/Masonry";
import SlideUp from "../../components/common/button/SlideUp";
// import axios from "axios";
// import { useParams } from "react-router";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
`;

const listInfo = {
  title: "공유버킷",
  image:
    "https://mblogthumb-phinf.pstatic.net/MjAxNzAyMDdfMTkw/MDAxNDg2NDQ0NzY1NDE4.yYT5P76Im5yu4XrSG1B7dtHkyZ9QJdH7qCEH5_PYruwg.1vy8ELVs5F07obMDW-RN1tLNO48T1pK-sWHhXI9Qk1cg.JPEG.fly5885/1_%EA%B0%95%EC%95%84%EC%A7%80%EC%82%AC%EC%A7%84_%281%29.jpg?type=w800",
};

const bucketList = [
  {
    seq: 1,
    title: "잠자기",
    category: { seq: 1, item: "일상" },
    emoji: "",
    complete: false,
  },
  {
    seq: 2,
    title: "잠자기",
    category: { seq: 1, item: "일상" },
    emoji: "",
    complete: false,
  },
  {
    seq: 3,
    title: "잠자기",
    category: { seq: 1, item: "일상" },
    emoji: "",
    complete: true,
  },
  {
    seq: 4,
    title: "잠자기",
    category: { seq: 1, item: "일상" },
    emoji: "",
    complete: false,
  },
  {
    seq: 5,
    title: "잠자기",
    category: { seq: 1, item: "일상" },
    emoji: "",
    complete: true,
  },
];

const diaries = [
  {
    seq: 1,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 2,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 3,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images: "",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdadsadasdasdvnajksdvnajksdhasklncklasdhfjkasdhfkasdfjksdhafjknasdlkfnasdklvbhasdbnvckl;asnckl",
  },
  {
    seq: 4,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images: "",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 5,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 6,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 7,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 8,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 9,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 10,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images:
      "https://post-phinf.pstatic.net/MjAyMDA4MDNfMjUz/MDAxNTk2NDQ1MTQ5NjM1.ktE2qiJXWg59X-j_ZDi0QYbhovIf154K_Zbzv49SWAsg.OH2mFxMysaeesMgW51ntnDDrblhac6fxYRyZis9xUs4g.JPEG/1.jpg?type=w1200",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
  {
    seq: 11,
    title: "잠자기",
    emoji: "",
    category: { seq: 1, item: "일상" },
    images: "",
    createdAt: "2023-04-04",
    content: "asdasdasdasdasdasdasdad",
  },
];

export default function SharePage() {
  const [pageFilter, setpageFilter] = useState("bucketList");
  //   const [listInfo, setListInfo] = useState({ title: "", image: "" });
  //   const [bucketList, setBucketList] = useState([]);
  //   const [diaries, setDiaries] = useState([]);
  //   const params = useParams();

  const changePageFilter = fil => {
    setpageFilter(fil);
  };

  //   const getShareInfo = useCallback(async () => {
  //     await axios
  //       .get("", {
  //         headers: {
  //           Authorization: `Bearer ${params.token}`,
  //         },
  //       })
  //       .then(res => {
  //         const resData = res.data.data;
  //         setListInfo(resData.info);
  //         setBucketList(resData.buckets);
  //         setDiaries(resData.diaries);
  //       });
  //   }, [params]);

  //   useEffect(() => {
  //     getShareInfo();
  //   }, [getShareInfo]);

  return (
    <>
      <ShareTopbar />
      <ShareHeader pageFilter={pageFilter} info={listInfo} propFunction={changePageFilter} />
      <Div>
        {pageFilter === "bucketList" && bucketList.map((bucket, index) => <ShareBucket bucket={bucket} key={bucket.seq} />)}
        {pageFilter === "diary" && (
          <Masonry columns={{ xs: 1, md: 2, lg: 3, xl: 4 }} spacing={2}>
            {diaries.map(diary => (
              <ShareDiary diary={diary} key={diary.seq} loading="lazy" />
            ))}
          </Masonry>
        )}
      </Div>
      <SlideUp />
    </>
  );
}
