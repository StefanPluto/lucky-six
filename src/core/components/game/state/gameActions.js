import * as types from './actionTypes';

export const updateGameData = (newGameData) => {
  return { type: types.UPDATE_GAME_DATA, payload: newGameData };
};

export const setRetailMode = (isRetailMode) => {
  return { type: types.SET_RETAIL_MODE, payload: isRetailMode };
};
