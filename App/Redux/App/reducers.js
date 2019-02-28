import * as types from './types';
import { AppState } from './../../Models';

const INITIAL_STATE: AppState = {
  connectionInfo: {
    effectiveType: 'unknown',
    type: 'unknown',
  },
  loggedIn: false,
  getNotebooks: {
    fetching: false,
  },
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CONNECTION_INFO:
      return { ...state, connectionInfo: action.payload };
    case types.LOG_IN:
      return { ...state, loggedIn: false };
    case types.LOG_IN_SUCCESS:
      return { ...state, loggedIn: true };
    case types.LOG_IN_FAILED:
      return { ...state, loggedIn: false };
    default:
      return state;
  }
};

export default reducer;
