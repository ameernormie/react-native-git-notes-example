import React from 'react';
import {
  ActivityIndicator,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchGist } from './../Redux/Gists/operations';

interface SearchGistsProps {
  navigation: NavigationScreenProp<NavigationState>;
  searchGist: (id: string) => void;
  gist: {};
  fetching: boolean;
}

interface SearchGistsState {
  gistId: string;
}

class SearchGistsScreen extends React.Component<
  SearchGistsProps,
  SearchGistsState
> {
  state = {
    gistId: '',
  };

  onGistTextInputChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>) => {
    this.setState(() => ({ gistId: text }));
  };

  onSearchGist = () => {
    const { gistId } = this.state;
    const { searchGist } = this.props;
    searchGist(gistId);
  };

  render() {
    const { fetching, gist } = this.props;
    let item = {};
    if (Boolean(Object.keys(gist).length)) {
      const { files } = gist;
      const key = Object.keys(files)[0];
      item = files[key];
    }
    if (fetching) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size='large' color='black' />
        </View>
      );
    }
    return (
      <View style={styles.landingContainer}>
        <View style={styles.searchGistContiner}>
          <TextInput
            style={styles.searchGistInput}
            onChange={this.onGistTextInputChange}
            placeholder='Search By Gist ID'
            autoFocus
          />
          <TouchableOpacity
            style={styles.searchIcon}
            onPress={this.onSearchGist}
          >
            <Icon name='search' size={16} />
          </TouchableOpacity>
        </View>
        {Boolean(Object.keys(gist).length) && (
          <View
            style={{
              width: 250,
              height: 350,
              backgroundColor: 'grey',
              justifyContent: 'center',
              borderRadius: 5,
            }}
          >
            <Text style={{ alignSelf: 'center' }}>{item.filename}</Text>
            <Text style={{}}>{item.content}</Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  credentialFields: {
    backgroundColor: 'grey',
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  searchGistContiner: {
    backgroundColor: 'grey',
    height: 35,
    width: 250,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchGistInput: {
    margin: 10,
  },
  searchIcon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

const mapStateToProps = ({ gist: { fetching, gist } }) => ({
  gist,
  fetching,
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ searchGist }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SearchGistsScreen);
