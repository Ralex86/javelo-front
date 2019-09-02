// @flow
import React from "react";
import { connect } from "react-redux";

import { CURRENT_INCREMENT } from "../components/App";
import * as ObjectivesSelectors from "../selectors/objectives";
import * as ObjectivesActions from "../actions/objectives";

import Button from "../components/Button";

type OwnProps = {};
type Objective = {
  id: number,
  title: string,
  start: number,
  target: number,
  current: number,
  start_date: string,
  end_date: string
};

type Props = OwnProps & {
  randomObjective: Objective,
  incrementCurrentValue: (increment: number, objective: Objective) => void
};

const LABEL = "increment random current".toUpperCase();

class RandomCurrent extends React.Component<Props> {
  render() {
    const { randomObjective, incrementCurrentValue } = this.props;

    return (
      <Button
        style={{
          color: "green"
        }}
        label={LABEL}
        onClick={() =>
          incrementCurrentValue(CURRENT_INCREMENT, randomObjective)
        }
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    randomObjective: ObjectivesSelectors.getRandomObjective(state)
  };
};

const mapDispatchToProps = {
  incrementCurrentValue: ObjectivesActions.incrementCurrentValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RandomCurrent);
