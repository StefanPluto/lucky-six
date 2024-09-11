import * as types from './actionTypes';

export const openNotification = (data) => {
  return { type: types.OPEN_NOTIFICATION, payload: data };
};

export const closeNotification = () => {
  return { type: types.CLOSE_NOTIFICATION, payload: { isOpen: false } };
};
