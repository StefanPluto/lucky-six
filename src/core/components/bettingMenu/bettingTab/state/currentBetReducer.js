import initialState from '../../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function currentBetReducer(currentBet = initialState.currentBet, action) {
  switch (action.type) {
    case types.SET_SELECTED_BET:
      return {
        ...currentBet,
        selectedBet: action.selectedBet,
      };
    case types.SET_SELECTED_GAME:
      return {
        ...currentBet,
        selectedGame: action.selectedGame,
      };
      case types.SET_SELECTED_BALLS:
        return {
          ...currentBet,
          selectedBalls: action.selectedBalls,
        };
      case types.SET_SELECTED_FIRST_BALL_COLOR:  
        return {
          ...currentBet,
          selectedFirstBallColor: action.selectedFirstBallColor,
        };
    default:
      return currentBet;
  }
}
