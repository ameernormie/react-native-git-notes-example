import * as types from './types';

const login = (state = 'not logged in', action) => {
  switch (action.type) {
    case types.LOG_IN:
      return action.payload;
    default:
      return state;
  }
};

export default login;
