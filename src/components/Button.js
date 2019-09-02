// @flow
import React from "react";
import styled from "@emotion/styled";

type Props = {
  label: string,
  onClick: Function,
  style: any
};

const Counter = (props: Props) => {
  const { label, onClick, style } = props;
  const _onClick = () => onClick && onClick();
  return (
    <RootStyled style={style} onClick={_onClick}>
      {label}
    </RootStyled>
  );
};

const RootStyled = styled.button(props => ({
  ...props.style
}));

export default Counter;
