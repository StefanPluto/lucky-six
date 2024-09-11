import * as types from './actionTypes';

export const setSelectedBet = (selectedBet) => {
    return { type: types.SET_SELECTED_BET, selectedBet };
  };

export const setSelectedGame = (selectedGame) => {
    return { type: types.SET_SELECTED_GAME, selectedGame };
};

export const setSelectedBalls = (selectedBalls) => {
    return { type: types.SET_SELECTED_BALLS, selectedBalls };
};

export const setSelectedFirstBallColor = (selectedFirstBallColor) => {
    return { type: types.SET_SELECTED_FIRST_BALL_COLOR, selectedFirstBallColor };
};

