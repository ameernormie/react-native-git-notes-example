import * as types from './types';

const INITIAL_STATE = {
  fetching: false,
  error: null,
  gist: {},
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SEARCH_GIST:
      return { ...state, fetching: true };
    case types.SEARCH_GIST_RECEIVED:
      return { ...state, fetching: false, gist: action.payload };
    case types.SEARCH_GIST_FAILED:
      return { ...state, fetching: false, error: action.payload };
    default:
      return state;
  }
};

export default reducer;
