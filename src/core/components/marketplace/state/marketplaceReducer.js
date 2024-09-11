import initialState from '../../../../state/reducers/initialState';
import * as types from './actionTypes';

export default function marketplaceReducer(state = initialState.marketplace, action) {
  switch (action.type) {
    case types.SET_MARKETPLACE:
      return action.payload;
    default:
      return state;
  }
}
