import initialState from '../../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function statisticsReducer(
  state = initialState.statistics,
  action
) {
  switch (action.type) {
    case types.UPDATE_STATISTICS:
      return action.payload;
    default:
      return state;
  }
}
