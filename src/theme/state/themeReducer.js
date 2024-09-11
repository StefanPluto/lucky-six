import initialState from '../../state/reducers/initialState';
import * as types from '../state/actionTypes';

export default function themeReducer(
  state = initialState.darkThemeEnabled,
  action
) {
  switch (action.type) {
    case types.SET_THEME_SUCCESS:
      state = !state;
      return state;
    default:
      return state;
  }
}
