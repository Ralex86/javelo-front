import * as ObjectivesActions from "../actions/objectives";

const objectivesReducer = (
  state = {
    objectives: [],
    currentCounters: [],
    isFetchingObjectives: false,
    hasFailedFetchingObjectives: false
  },
  action
) => {
  switch (action.type) {
    case ObjectivesActions.SET_CURRENT_COUNT:
      state = {
        ...state,
        currentCounters: state.currentCounters.map(counter => {
          console.log(counter);
          if (counter.objectiveId === action.payload.objectiveId) {
            return action.payload;
          }
          return counter;
        })
      };
      break;
    case ObjectivesActions.SET_CURRENT:
      state = {
        ...state,
        objectives: state.objectives.map(objective => {
          if (objective.id === action.payload.id) {
            return action.payload;
          }
          return objective;
        })
      };
      break;
    case ObjectivesActions.GET_OBJECTIVES.Start:
      state = {
        ...state,
        isFetchingObjectives: true,
        hasFailedFetchingObjectives: false
      };
      break;
    case ObjectivesActions.GET_OBJECTIVES.Success:
      state = {
        ...state,
        objectives: [...state.objectives, ...action.payload],
        currentCounters: action.payload.map(objective => ({
          objectiveId: objective.id,
          count: 0
        })),
        isFetchingObjectives: false,
        hasFailedFetchingObjectives: false
      };
      break;
    case ObjectivesActions.GET_OBJECTIVES.Failure:
      state = {
        ...state,
        isFetchingObjectives: false,
        hasFailedFetchingObjectives: true
      };
      break;
    default:
      return state;
  }
  return state;
};

export default objectivesReducer;
