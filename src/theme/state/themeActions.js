import * as types from './actionTypes';

export function setThemeSuccess(dark) {
  return { type: types.SET_THEME_SUCCESS, dark };
}
