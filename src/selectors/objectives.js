export const getAchievedObjectives = state => {
  const { objectives } = state.objectives;
  return objectives.filter(objective => objective.target < objective.current);
};

export const getCurrentCounters = state => {
  const { currentCounters } = state.objectives;
  return currentCounters;
};

export const getCurrentCounter = (state, objectiveId) => {
  const { currentCounters } = state.objectives;
  return currentCounters.filter(
    currentCounter => currentCounter.objectiveId === objectiveId
  );
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getRandomObjective = state => {
  const { objectives } = state.objectives;
  const objectivesCount = objectives.length;
  const randomObjective = objectives[getRandomInt(0, objectivesCount - 1)];
  return randomObjective;
};

export const getObjective = (state, { objectiveId }) => {
  const { objectives } = state.objectives;
  return objectives.filter(objective => objective.id === objectiveId);
};
