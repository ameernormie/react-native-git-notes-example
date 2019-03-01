import * as types from './types';

export const searchGist = id => ({
  type: types.SEARCH_GIST,
  payload: id,
});

export const searchGistReceived = gist => ({
  type: types.SEARCH_GIST_RECEIVED,
  payload: gist,
});

export const searchGistFailed = err => ({
  type: types.SEARCH_GIST_FAILED,
  payload: err,
});
