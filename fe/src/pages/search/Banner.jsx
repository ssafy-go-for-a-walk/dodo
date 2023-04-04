import React from "react";
import styled from "styled-components";
import bannerInfo from "../../configs/bannerConfig";

const BannerBox = styled.div`
  width: 80%;
  max-width: 800px;
  height: 114px;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 3%;
  cursor: default;
`;
const BannerTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const BannerContent = styled.div`
  font-size: 10px;
  white-space: pre-line;
`;

const BannerImg = styled.img`
  width: 96px;
  height: 96px;
`;

export default function Banner(props) {
  const { category } = props;
  const bannerData = bannerInfo[`${category}`];
  return (
    <BannerBox style={{ backgroundColor: `${bannerData.color}` }}>
      <div>
        <BannerTitle>{category}</BannerTitle>
        <BannerContent>{bannerData.content}</BannerContent>
      </div>
      <BannerImg src={bannerData.img} />
    </BannerBox>
  );
}
