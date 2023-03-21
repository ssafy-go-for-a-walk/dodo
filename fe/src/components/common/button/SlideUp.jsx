import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowDropupCircle } from "react-icons/io";

const UpButton = styled.div`
  position: fixed;
  bottom: 16px;
  right: 72px;
  cursor: pointer;

  .upIcon {
    color: #1c9bff;
    font-size: 50px;
  }
`;
export default function SlideUp() {
  const [showBtn, setShowBtn] = useState(false);

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const ShowButton = () => {
      if (window.scrollY > 0) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    };
    window.addEventListener("scroll", ShowButton);
    return () => {
      window.removeEventListener("scroll", ShowButton);
    };
  }, []);

  return (
    <>
      {showBtn && (
        <UpButton onClick={scrollToTop}>
          <IoIosArrowDropupCircle className="upIcon" />
        </UpButton>
      )}
    </>
  );
}
