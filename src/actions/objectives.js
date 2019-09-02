import * as ObjectivesSelectors from "../selectors/objectives";
import requestType from "../utils/requestType";
import FIXTURE from "../fixtures/data.json";

export const GET_OBJECTIVES = requestType("GET_OBJECTIVES");
export const SET_CURRENT = "OBJECTIVES_SET_CURRENT";
export const SET_CURRENT_COUNT = "OBJECTIVES_SET_CURRENT_COUNT";
export const SET_INITIAL_CURRENT_COUNT = "OBJECTIVES_SET_INITIAL_CURRENT_COUNT";
export const GET_OBJECTIVE = requestType("GET_OBJECTIVE");

const incrementCurrentCounter = objective => (dispatch, getState) => {
  const currentCount = ObjectivesSelectors.getCurrentCounter(
    getState(),
    objective.id
  );

  return dispatch({
    type: SET_CURRENT_COUNT,
    payload: {
      objectiveId: objective.id,
      count: currentCount[0].count + 1
    }
  });
};

export const incrementCurrentValue = (increment, objective) => {
  return dispatch => {
    dispatch(incrementCurrentCounter(objective));
    const { current, ...rest } = objective;
    const new_objective = {
      ...rest,
      current: current + increment
    };

    dispatch({
      type: SET_CURRENT,
      payload: new_objective
    });
  };
};

function getObjectivesStart() {
  console.log(GET_OBJECTIVES.Start);

  return {
    type: GET_OBJECTIVES.Start
  };
}

function getObjectivesSuccess(objectives) {
  console.log(GET_OBJECTIVES.Success);
  return {
    type: GET_OBJECTIVES.Success,
    payload: objectives
  };
}

export function getObjectives() {
  return async (dispatch, getState) => {
    await dispatch(getObjectivesStart());

    // Faking an api request
    await setTimeout(() => {
      dispatch(getObjectivesSuccess(FIXTURE));
    }, 2000);
  };
}
