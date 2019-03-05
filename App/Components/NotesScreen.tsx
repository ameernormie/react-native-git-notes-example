import React from 'react';
import {
  Alert,
  AsyncStorage,
  Dimensions,
  FlatList,
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableHighlight,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import NotebookRow from '../Common/NotebookRow';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface NotesScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface NotesScreenState {
  newNotebookName: string;
  notes: {
    title: string;
  }[];
}

class NotesScreen extends React.Component<NotesScreenProps, NotesScreenState> {
  constructor(props: NotesScreenProps) {
    super(props);
    this.state = {
      newNotebookName: '',
      notes: [],
    };
  }

  async componentDidMount() {
    try {
      const notebooks: any = await AsyncStorage.getItem('Notebooks');
      console.log('notebooks ', notebooks);
      if (!JSON.parse(notebooks)) {
        const notebookArray: [] = [];
        await AsyncStorage.setItem('Notebooks', JSON.stringify(notebookArray));
      } else {
        this.setState(() => ({ notes: JSON.parse(notebooks) }));
      }
    } catch (error) {
      throw new Error('Unable to get Notebooks');
    }
  }

  onNewNotebookChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    this.setState(() => ({ newNotebookName: text }));
  };

  onSaveNotebook = async () => {
    const { newNotebookName } = this.state;
    const notebooks: any = await AsyncStorage.getItem('Notebooks');
    if (!newNotebookName) {
      Alert.alert('Blank Notebook ', 'Cannot Save Empty notebook ');
      return;
    }
    try {
      const notebooksArray = JSON.parse(notebooks);
      notebooksArray.push({ title: newNotebookName, notes: [] });
      this.setState(({ notes }) => ({
        notebooks: [...notes, { title: newNotebookName }],
      }));
      await AsyncStorage.setItem('Notebooks', JSON.stringify(notebooksArray));
      Alert.alert('Success ', 'Notebook Saved');
    } catch (error) {
      throw new Error('Unable to store data to async storage');
    }
  };

  onDeleteNotebook = async (e: GestureResponderEvent, index: number) => {
    const { notes } = this.state;
    const updatedNotebooks = notes;
    updatedNotebooks.splice(index, 1);
    this.setState(() => ({ notes: updatedNotebooks }));
    try {
      await AsyncStorage.setItem('Notebooks', JSON.stringify(updatedNotebooks));
    } catch (error) {
      Alert.alert('Error', 'Unable to delete');
    }
  };

  onEditNotebookTitle = async (index: number, title: string) => {
    const { notes } = this.state;
    const updatedNotebooks = notes;
    updatedNotebooks[index].title = title;
    try {
      await AsyncStorage.setItem('Notebooks', JSON.stringify(updatedNotebooks));
    } catch (error) {
      Alert.alert('Error', 'Unable to Edit Title');
    }
  };

  renderNotebook = (item: any, index: any) => {
    return (
      <NotebookRow
        item={item}
        index={index}
        onDelete={this.onDeleteNotebook}
        onEdit={this.onEditNotebookTitle}
        onRowPress={() => console.log('pressed')}
      />
    );
  };

  render() {
    const { notes } = this.state;
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
        {Boolean(notes.length) && (
          <View style={{ flex: 1 }}>
            <FlatList
              data={notes}
              renderItem={({ item, index }) => this.renderNotebook(item, index)}
            />
          </View>
        )}
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

export default NotesScreen;
