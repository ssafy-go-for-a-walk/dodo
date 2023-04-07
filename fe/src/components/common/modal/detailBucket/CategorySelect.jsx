import React, { useState } from "react";
import styled from "styled-components";
import cate from "../../../../configs/categoryConfig";
import color from "../../../../configs/cateConfigs";

const Div = styled.div`
  z-index: 10;
`;

const Selectbox = styled.div`
  width: 72px;
  height: 32px;
  cursor: pointer;
`;

const SelectedLabel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 72px;
  height: 32px;
  font-size: 16px;
  background: #acabab;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 4px;

  .icon {
    color: #1c9bff;
    font-size: 16px;
  }
`;

const activeExist = ({ active = true }) => {
  return `max-height: ${active ? "288px" : "0"}`;
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
  &:hover {
    background: ${props => color[`${props.category}`]};
    color: #ffffff;
  }
`;

export default function CategorySelect(props) {
  const { category } = props;
  const [active, setActive] = useState(false);
  const categoryChange = tag => {
    props.propFunction(tag);
  };

  return (
    <Div>
      <Selectbox>
        <SelectedLabel value={category} onClick={() => setActive(!active)}>
          기타
        </SelectedLabel>
        {active && (
          <OptionList>
            {cate
              .filter(element => element.name !== "전체")
              .map(element => (
                <OptionItem
                  key={element.name}
                  onClick={() => {
                    setActive(false);
                    categoryChange(element.name);
                  }}
                  category={element.name}
                >
                  {element.name}
                </OptionItem>
              ))}
          </OptionList>
        )}
      </Selectbox>
    </Div>
  );
}
