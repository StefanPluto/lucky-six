import initialState from '../../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function ticketReducer(ticket = initialState.ticket, action) {
  let newBets = JSON.parse(JSON.stringify(ticket.bets));
  var currentlyEditing = '';
  switch (action.type) {
    case types.ADD_BETS:
      var newBet = {
        gameType: action.gameType,
        bet: action.bet,
        stake: action.minimalStake,
        invalid: false,
      };
      newBets.push(newBet);
      return {
        ...ticket,
        bets: [...newBets],
        totalStake: `${parseInt(ticket.totalStake) + parseInt(newBet.stake)}`,
      };
    case types.SET_CURRENTLY_EDITING:
      if (action.isEditing) {
        currentlyEditing = action.index;
      } else {
        currentlyEditing = '';
      }
      return {
        ...ticket,
        currentlyEditing: currentlyEditing,
      };
    case types.EDIT_BET:
      var newStake = 0;
      var oldStake = newBets[action.index].stake;
      if (oldStake == '') oldStake = 0;
      var newEditedBet = {
        gameType: action.gameType,
        bet: action.bet,
        stake: action.minimalStake,
        invalid: false,
      };
      if (action.iterationNumber == 1) {
        newBets[action.index] = newEditedBet;
      } else if (action.iterationNumber > 1) {
        newBets.push(newEditedBet);
        oldStake = 0;
      } else {
        newBets[action.index] = newEditedBet;
      }
      newStake = newEditedBet.stake;
      return {
        ...ticket,
        bets: newBets,
        totalStake: `${
          parseInt(ticket.totalStake) - parseInt(oldStake) + parseInt(newStake)
        }`,
      };
    case types.UPDATE_BET:
      var stakeIncrease = 0;
      if (action.stake === '') {
        stakeIncrease = 0 - newBets[action.index].stake;
        newBets[action.index].stake = '';
      } else if (action.stake !== '') {
        stakeIncrease = parseInt(action.stake) - newBets[action.index].stake;
        newBets[action.index].stake = parseInt(action.stake);
      }
      return {
        ...ticket,
        bets: newBets,
        totalStake: `${parseInt(ticket.totalStake) + parseInt(stakeIncrease)}`,
      };

    case types.REMOVE_BET:
      if (action.isEditing) {
        currentlyEditing = '';
      }
      var stakeDecrase = newBets[action.index].stake;
      if (stakeDecrase === '') {
        stakeDecrase = 0;
      }
      newBets.splice(action.index, 1);
      return {
        ...ticket,
        bets: newBets,
        currentlyEditing: currentlyEditing,
        totalStake: `${parseInt(ticket.totalStake) - parseInt(stakeDecrase)}`,
      };

    case types.CLEAR_TICKET:
      return {
        ...ticket,
        bets: [],
        totalStake: 0,
      };
    case types.UPDATE_TICKET_STAKE:
      newBets.forEach((bet) => {
        bet.stake = parseInt(action.totalStake) / newBets.length;
      });
      return {
        ...ticket,
        bets: newBets,
        totalStake: action.totalStake,
      };
    case types.SET_FUTURE_BET:
      return {
        ...ticket,
        futureBet: action.futureBet,
      };
    case types.SET_INVALID_BET:
      newBets[action.index].invalid = action.isInvalid;
      return {
        ...ticket,
        bets: newBets,
      };
    default:
      return ticket;
  }
}
