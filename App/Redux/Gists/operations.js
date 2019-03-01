import * as actions from './actions';
import axios from 'axios';
import { Alert } from 'react-native';

export function searchGist(id) {
  return dispatch => {
    dispatch(actions.searchGist(id));
    return axios
      .get(`https://api.github.com/gists/${id}`)
      .then(({ data }) => {
        dispatch(actions.searchGistReceived(data));
      })
      .catch(({ response: { data } }) => {
        Alert.alert('Error ', `Gist ${data.message}`);
        dispatch(actions.searchGistFailed(data));
      });
  };
}
