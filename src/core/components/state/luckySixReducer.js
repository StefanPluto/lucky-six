import initialState from "../../../state/reducers/initialState";
import {
  CHANGE_FIRST_TAB,
  CHANGE_SECOND_TAB,
  CHANGE_THIRD_TAB,
  CHANGE_MOBILE_TAB,
  CHANGE_VIEW_SCREEN,
} from "./luckySixActionTypes";

export default function selectedTabReducer(
  state = initialState.selectedTab,
  action
) {
  switch (action.type) {
    case CHANGE_FIRST_TAB:
      return {
        ...state,
        firstTab: action.payload,
      };
    case CHANGE_SECOND_TAB:
      return {
        ...state,
        secondTab: action.payload,
      };
    case CHANGE_THIRD_TAB:
      return {
        ...state,
        thirdTab: action.payload,
      };
    case CHANGE_MOBILE_TAB:
      return {
        ...state,
        mobileTab: action.payload,
      };
    case CHANGE_VIEW_SCREEN:
      return {
        ...state,
        viewScreen: action.payload,
      };
    default:
      return state;
  }
}
