import React, { useState } from "react";
import styled from "styled-components";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Div = styled.div`
  width: 80%;
  max-width: 800px;
  margin-bottom: 24px;
  z-index: 2;
`;

const Selectbox = styled.div`
  width: 100px;
  height: 25px;
  border-radius: 12.5px;
  background: #ffffff;
  cursor: pointer;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
`;

const SelectedLabel = styled.button`
  display: flex;
  align-items: center;
  border: none;
  width: inherit;
  height: inherit;
  justify-content: space-between;
  padding-left: 24px;
  font-size: 16px;
  background: #ffffff;
  border-radius: 12.5px;
  cursor: pointer;
  margin-bottom: 4px;

  .icon {
    color: #1c9bff;
    font-size: 16px;
  }
`;

const activeExist = ({ active = true }) => {
  return `max-height: ${active ? "75px" : "0"}`;
};

const OptionList = styled.div`
  border-radius: 8px;
  background: #ffffff;
  ${activeExist};
  transition: 0.2s ease-in-out;
  box-shadow: 0px 4px 4px rgba(182, 86, 86, 0.25);
`;

const OptionItem = styled.div`
  text-align: center;
  border-bottom: 1px solid rgba(182, 86, 86, 0.25);
  &: hover {
    background: #e9f5ff;
  }
`;

export default function Filter(props) {
  const { bucketFilter } = props;
  const list = ["전체", "완료", "미완"];
  const [active, setActive] = useState(false);
  const changeBucketFilter = fil => {
    props.propFunction(fil);
  };

  return (
    <Div>
      <Selectbox>
        <SelectedLabel value={bucketFilter} onClick={() => setActive(!active)}>
          {bucketFilter}
          {active ? <IoIosArrowUp className="icon" /> : <IoIosArrowDown className="icon" />}
        </SelectedLabel>
        {active && (
          <OptionList>
            {list.map(element => (
              <OptionItem
                key={element}
                onClick={() => {
                  setActive(false);
                  changeBucketFilter(element);
                }}
              >
                {element}
              </OptionItem>
            ))}
          </OptionList>
        )}
      </Selectbox>
    </Div>
  );
}
