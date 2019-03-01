import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import NotebookRow from '../Common/NotebookRow';

const items = [
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
  { title: 'title' },
];

interface NotebookScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface NotebookScreenState {
  newNotebookName: string;
}

class NotebookScreen extends React.Component<
  NotebookScreenProps,
  NotebookScreenState
> {
  state = {
    newNotebookName: '',
  };
  onNewNotebookChange = ({ nativeEvent: { text } }) => {
    this.setState(() => ({ newNotebookName: text }));
  };
  onSaveNotebook = e => {};

  renderNotebook = item => {
    const task = item.item;
    return <NotebookRow item={task} />;
  };

  render() {
    return (
      <View style={styles.notebookContainer}>
        <View style={styles.searchNotebookContainer}>
          <TextInput
            style={styles.searchNotebookInput}
            placeholder='Gist Search'
          />
          <Icon
            style={styles.searchIcon}
            size={16}
            name='search'
            color='black'
          />
        </View>
        <View style={styles.addNotebookContainer}>
          <TextInput
            style={styles.newNotebook}
            placeholder='New Notebook'
            onChange={this.onNewNotebookChange}
          />
          <TouchableHighlight
            style={styles.saveButton}
            onPress={this.onSaveNotebook}
          >
            <Text style={styles.saveButtonText}>Save </Text>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList data={items} renderItem={this.renderNotebook} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notebookContainer: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  searchNotebookContainer: {
    backgroundColor: 'grey',
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchNotebookInput: {
    margin: 10,
  },
  searchIcon: {
    alignSelf: 'center',
    marginRight: 10,
  },
  addNotebookContainer: {
    height: 60,
    width: 200,
    backgroundColor: 'transparent',
  },
  newNotebook: {
    height: 35,
    width: 200,
    backgroundColor: 'grey',
  },
  saveButton: {
    height: 20,
    width: 70,
    backgroundColor: 'grey',
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default NotebookScreen;
