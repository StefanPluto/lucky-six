import * as types from './actionTypes';

export const addBetSuccess = (gameType, bet, index, isEditing, iterationNumber, minimalStake) => {
  if(!isEditing)
  return { type: types.ADD_BETS, gameType, bet, minimalStake };
  else return { type: types.EDIT_BET, gameType, bet, index, isEditing, iterationNumber, minimalStake }
};

export const clearBets = () => {
  return { type: types.CLEAR_BETS };
};

export const removeBet = (index, isEditing) => {
  return { type: types.REMOVE_BET, index, isEditing };
};

export const updateBet = (index, stake) => {
  return { type: types.UPDATE_BET, index, stake };
};


export const setFutureBet = (futureBet) => {
  return { type: types.SET_FUTURE_BET, futureBet };
};

export const clearTicket = () => {
  return { type: types.CLEAR_TICKET };
};

export const updateTicketStake = (totalStake) => {
  return { type: types.UPDATE_TICKET_STAKE, totalStake };
};

export const updateTicketFutureBet = (futureBet) => {
  return { type: types.UPDATE_TICKET_FUTURE_BET, futureBet };
};

export const setCurrentlyEditing = (index, isEditing) => {
  return { type: types.SET_CURRENTLY_EDITING, index, isEditing };
};

export const setInvalidBet = (index, isInvalid) => {
  return {type: types.SET_INVALID_BET, index, isInvalid}
}
