import * as types from './actionTypes';

export const updateCurrentGameStatistics = (newCurrentStatistics) => {
  return {
    type: types.UPDATE_CURRENT_STATISTICS,
    payload: newCurrentStatistics,
  };
};
