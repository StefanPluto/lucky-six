import initialState from '../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function gameReducer(state = initialState.game, action) {
  switch (action.type) {
    case types.UPDATE_GAME_DATA:
      return {
        ...state,
        gameInfo: action.payload.gameInfo,
        data: action.payload.data,
        phase: action.payload.phase,
        timeLeft: action.payload.timeLeft,
      }
    case types.SET_RETAIL_MODE:
      return {
        ...state,
        retailMode: action.payload,
      };
    default:
      return state;
  }
}
