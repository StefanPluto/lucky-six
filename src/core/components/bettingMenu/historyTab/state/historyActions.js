import * as types from './actionTypes';

export const updateHistory = (newHistory) => {
  return { type: types.UPDATE_HISTORY, payload: newHistory };
};
