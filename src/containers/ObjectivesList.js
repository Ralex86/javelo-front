// @flow
import React from "react";
import { connect } from "react-redux";

import Objectives from "../components/Objectives";
import * as ObjectivesSelectors from "../selectors/objectives";
import * as ObjectivesActions from "../actions/objectives";

type ObjectiveType = {
  id: number,
  title: string,
  start: number,
  target: number,
  current: number,
  start_date: string,
  end_date: string
};
type Counter = {
  objectiveId: number,
  count: number
};
type OwnProps = {};

type Props = OwnProps & {
  objectives: Array<ObjectiveType>,
  achieved: Array<ObjectiveType>,
  currentCounters: Array<Counter>,
  isFetchingObjectives: boolean,
  getObjectives: Function,
  incrementCurrentValue: (increment: number) => void
};

class ObjectivesList extends React.Component<Props> {
  componentDidMount() {
    this.props.getObjectives();
  }

  render() {
    const {
      objectives,
      achieved,
      currentCounters,
      isFetchingObjectives,
      incrementCurrentValue
    } = this.props;

    if (isFetchingObjectives) return <span>Loading...</span>;

    return (
      <Objectives
        incrementCurrentValue={incrementCurrentValue}
        objectives={objectives}
        currentCounters={currentCounters}
        achieved={achieved}
      />
    );
  }
}

const mapStateToProps = state => {
  const { objectives } = state;
  return {
    objectives: objectives.objectives,
    achieved: ObjectivesSelectors.getAchievedObjectives(state),
    currentCounters: ObjectivesSelectors.getCurrentCounters(state),
    isFetchingObjectives: objectives.isFetchingObjectives
  };
};

const mapDispatchToProps = {
  getObjectives: ObjectivesActions.getObjectives,
  incrementCurrentValue: ObjectivesActions.incrementCurrentValue
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ObjectivesList);
