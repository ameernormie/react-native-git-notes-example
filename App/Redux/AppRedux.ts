import { AppState, ConnectionInfo, State } from './../Models';
import { ActionCreators } from 'reduxsauce';

/* -----------INITIAL STATE-------------- */
export const state: AppState = {
  connectionInfo: { effectiveType: 'unknown', type: 'unknown' },
  loggedIn: false,
  getNotebooks: {
    fetching: false,
  },
  getNotes: {
    fetching: false,
  },
};
