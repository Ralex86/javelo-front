import React from "react";
import styled from "@emotion/styled";

const Counter = props => {
  const { count } = props;
  return <RootStyled>{count}</RootStyled>;
};

const RootStyled = styled.div`
  color: green;
`;

export default Counter;
