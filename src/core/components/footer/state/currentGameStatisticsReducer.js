import initialState from '../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function currentGameStatisticsReducer(
  state = initialState.currentGameStatistics,
  action
) {
  switch (action.type) {
    case types.UPDATE_CURRENT_STATISTICS:
      return action.payload;
    default:
      return state;
  }
}
