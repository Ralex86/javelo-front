import React, { Component } from "react";
import styled from "@emotion/styled";

import ObjectivesList from "../containers/ObjectivesList";
import RandomCurrent from "../containers/RandomCurrent";

// TypeScript and JavaScript Language Features
// for flow support disable typescript support in builtin extension

const INFO = "objectives have their current value over their target";
const TODAY = "2018-02-20";
const CURRENT_INCREMENT = 1;

class App extends Component {
  render() {
    return (
      <RootStyled>
        <ButtonContainer>
          <RandomCurrent />
        </ButtonContainer>
        <ObjectivesList />
      </RootStyled>
    );
  }
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RootStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

export { INFO, TODAY, CURRENT_INCREMENT };
export default App;
