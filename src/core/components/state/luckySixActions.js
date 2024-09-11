import {
  CHANGE_FIRST_TAB,
  CHANGE_SECOND_TAB,
  CHANGE_THIRD_TAB,
  CHANGE_MOBILE_TAB,
  CHANGE_VIEW_SCREEN,
} from "./luckySixActionTypes";

export const changeFirstTab = (data) => {
  return {
    type: CHANGE_FIRST_TAB,
    payload: data,
  };
};

export const changeSecondTab = (data) => {
  return {
    type: CHANGE_SECOND_TAB,
    payload: data,
  };
};

export const changeThirdTab = (data) => {
  return {
    type: CHANGE_THIRD_TAB,
    payload: data,
  };
};

export const changeMobileTab = (data) => {
  return {
    type: CHANGE_MOBILE_TAB,
    payload: data,
  };
};

export const changeViewScreen = (data) => {
  return {
    type: CHANGE_VIEW_SCREEN,
    payload: data,
  };
};
