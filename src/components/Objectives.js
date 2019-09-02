// @flow
import React from "react";
import styled from "@emotion/styled";
import moment from "moment";

import CurrentCounter from "../containers/CurrentCounter";

import Chart from "./Chart";
import List from "./List";

import { INFO, TODAY, CURRENT_INCREMENT } from "../components/App";

type Point = {
  x: number,
  y: number,
  style: any
};

type ObjectiveType = {
  id: number,
  title: string,
  start: number,
  target: number,
  current: number,
  start_date: string,
  end_date: string
};

type CounterType = {
  objectiveId: number,
  count: number
};

type Props = {
  objectives: Array<ObjectiveType>,
  achieved: Array<ObjectiveType>,
  currentCounters: Array<CounterType>,
  incrementCurrentValue: (increment: number, objective: ObjectiveType) => void
};

class Objectives extends React.Component<Props> {
  _onClick = (objective: ObjectiveType) => {
    const { incrementCurrentValue } = this.props;
    incrementCurrentValue &&
      incrementCurrentValue(CURRENT_INCREMENT, objective);
  };

  normalizeDateToNumber = (start: string, date: string): number => {
    const a = moment(start);
    const b = moment(date);
    const days = b.diff(a, "days");
    return days;
  };

  getPoints = (objective: Objective): Array<Point> => {
    return [
      {
        x: 0,
        y: objective.start,
        style: { fill: "red" }
      },
      {
        x: this.normalizeDateToNumber(TODAY, objective.end_date),
        y: objective.current,
        style: { fill: "green" }
      },
      {
        x: this.normalizeDateToNumber(objective.start_date, objective.end_date),
        y: objective.target,
        style: { fill: "red" }
      }
    ];
  };

  renderObjective = (objective: ObjectiveType) => {
    return (
      <Objective>
        <Title>{objective.title}</Title>
        <Chart width={200} height={200} points={this.getPoints(objective)} />
        <Row>
          <Button onClick={() => this._onClick(objective)}>
            {`Increment current by ${CURRENT_INCREMENT}`}
          </Button>
          <CurrentCounter objectiveId={objective.id} />
        </Row>
      </Objective>
    );
  };

  renderAchievedObjectivesCount = (count: number) => (
    <span>{count + " " + INFO}</span>
  );

  render() {
    const { objectives, achieved, currentCounters } = this.props;
    const achievedCount = achieved.length;
    console.log(currentCounters);
    return (
      <RootStyled>
        {this.renderAchievedObjectivesCount(achievedCount)}
        <Container>
          <List data={objectives} renderItem={this.renderObjective} />
        </Container>
      </RootStyled>
    );
  }
}

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1em 0;
`;

const Button = styled.button``;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.h3`
  color: red;
`;

const Objective = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0;
  margin: 1em;
`;

const RootStyled = styled.div``;

export default Objectives;
