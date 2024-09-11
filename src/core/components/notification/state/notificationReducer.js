import initialState from '../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function notificationReducer(state = initialState.notification, action) {
  switch (action.type) {
    case types.OPEN_NOTIFICATION:
      return action.payload;
    case types.CLOSE_NOTIFICATION:
      return action.payload;
    default:
      return state;
  }
}
