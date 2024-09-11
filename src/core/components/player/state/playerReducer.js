import initialState from '../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function playerReducer(state = initialState.player, action) {
  switch (action.type) {
    case types.LOG_IN:
      return action.payload;
    case types.LOG_OUT:
      return action.payload;
    case types.PAY_IN:
      return {
        ...state,
        balance: action.payload.balance,
      };
    case types.GET_TICKET_HISTORY :
      return {
        ...state,
        ticketHistory: action.payload,
      };
    case types.GET_BALANCE:
      return action.payload;
    default:
      return state;
  }
}
