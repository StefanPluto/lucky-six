import * as types from './actionTypes';

export const updateStatistics = (newStatistics) => {
  return { type: types.UPDATE_STATISTICS, payload: newStatistics };
};
