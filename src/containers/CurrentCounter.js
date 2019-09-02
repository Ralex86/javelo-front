// @flow
import React from "react";
import { connect } from "react-redux";

import * as ObjectivesSelectors from "../selectors/objectives";

import Counter from "../components/Counter";

type CounterType = {
  objectiveId: number,
  count: number
};

type OwnProps = {
  objectiveId: number
};

type Props = OwnProps & {
  counter: CounterType
};

class CurrentCounter extends React.Component<Props> {
  render() {
    const {
      counter: { count }
    } = this.props;

    return <Counter count={count} />;
  }
}

const mapStateToProps = (state, ownProps) => {
  const { objectiveId } = ownProps;
  return {
    counter: ObjectivesSelectors.getCurrentCounter(state, objectiveId)[0]
  };
};

export default connect(
  mapStateToProps,
  null
)(CurrentCounter);
