import React from 'react';
import {
  Alert,
  AsyncStorage,
  Dimensions,
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

const SCREEN_WIDTH = Dimensions.get('screen').width;

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
  notebooks: [];
}

class NotebookScreen extends React.Component<
  NotebookScreenProps,
  NotebookScreenState
> {
  constructor(props: NotebookScreenProps) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      newNotebookName: '',
      notebooks: [],
    };
  }

  async componentDidMount() {
    try {
      const noteBookList = await AsyncStorage.getItem('notebook');
      console.log('storage ', noteBookList);
    } catch (error) {
      throw new Error('Unable to get Notebooks');
    }
  }

  onNewNotebookChange = ({ nativeEvent: { text } }) => {
    this.setState(() => ({ newNotebookName: text }));
  };

  onSaveNotebook = async () => {
    const { newNotebookName } = this.state;
    if (!newNotebookName) {
      Alert.alert('Blank Notebook ', 'Cannot Save Empty notebook ');
      return;
    }
    try {
      this.textInput.clear();
      await AsyncStorage.setItem('notebook', newNotebookName);
      Alert.alert('Success ', 'Notebook Saved');
    } catch (error) {
      throw new Error('Unable to store data to async storage');
    }
  };

  renderNotebook = item => {
    const task = item.item;
    return <NotebookRow item={task} />;
  };

  render() {
    console.log('props ', this.props);
    return (
      <View style={styles.notebookContainer}>
        <View style={styles.searchNotebookContainer}>
          <TextInput
            style={styles.searchNotebookInput}
            placeholder='Gist Search'
            ref={input => {
              this.textInput = input;
            }}
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
    backgroundColor: '#eee',
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
    paddingHorizontal: 10,
    width: SCREEN_WIDTH,
    backgroundColor: 'transparent',
  },
  newNotebook: {
    height: 35,
    width: 200,
    backgroundColor: '#eee',
  },
  saveButton: {
    height: 20,
    width: 70,
    backgroundColor: '#def',
    alignSelf: 'flex-end',
    borderRadius: 5,
  },
  saveButtonText: {
    fontSize: 15,
    textAlign: 'center',
  },
});

export default NotebookScreen;
