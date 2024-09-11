import * as userActionTypes from './actionTypes';
import * as marketplaceActionTypes from '../../marketplace/state/actionTypes';
import * as notificationTypes from '../../notification/state/actionTypes';
import * as api from '../../../../api/api';

export const logIn = (locationData) => async (dispatch) => {
  await api.post('user/login', locationData).then(
    ({ data }) => {
      localStorage.setItem('token', data.token);
      dispatch({ type: userActionTypes.LOG_IN, payload: data.userData });
      dispatch({ type: marketplaceActionTypes.SET_MARKETPLACE, payload: data.userData.marketplace });
      return;
    },
    ({ message }) => {
      dispatch({
        type: notificationTypes.OPEN_NOTIFICATION,
        payload: {
          message: message,
          isOpen: true,
          severity: 'error',
          duration: 3000,
        },
      });
      return false;
    }
  );
};

export const payInTicket = (ticketData, sessionId, maximumTotalStake) => async (dispatch) => {
  const data = {
    ticket: ticketData,
    sessionId: sessionId,
  };
  let canClearTicket = await api
    .post('user/create-ticket', data)
    .then(({ data }) => {
      dispatch({ type: userActionTypes.PAY_IN, payload: data.balanceData });
      return true;
    })
    .catch((error) => {
      dispatch({
        type: notificationTypes.OPEN_NOTIFICATION,
        payload: {
          message: error.response.data.message,
          isOpen: true,
          severity: 'error',
          duration: 3000,
        },
      });
      return false;
    });
  return canClearTicket;
};

export const getTicketHistory = () => async (dispatch) => {
  const data = {
  };
  await api.post('data/tickets', data).then(
    ({ data }) => {
      dispatch({ type: userActionTypes.GET_TICKET_HISTORY , payload: data });
    }
  );
};

export const getCurrentBalance = (sessionId) => async (dispatch) => {
  const data = {
    sessionId: sessionId,
  };
  let currentBalance = 0;
  await api.post('user/balance', data).then(
    ({ data }) => {
      currentBalance = data.balanceData.balance;
    },
    ({ message }) => {
      dispatch({
        type: notificationTypes.OPEN_NOTIFICATION,
        payload: {
          message: message,
          isOpen: true,
          severity: 'error',
          duration: 3000,
        },
      });
    }
  );
  return currentBalance;
};

export const logOut = (sessionId, marketplaceId) => async (dispatch) => {
  const data = {
    sessionId: sessionId,
    marketplaceId: marketplaceId,
  };
  await api.post('user/logout', data).then(
    () => {
      return true;
    },
    ({ message }) => {
      dispatch({
        type: notificationTypes.OPEN_NOTIFICATION,
        payload: {
          message: message,
          isOpen: true,
          severity: 'error',
          duration: 3000,
        },
      });
      return false;
    }
  );
};
