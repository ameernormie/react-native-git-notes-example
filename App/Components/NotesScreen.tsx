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
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import NotebookRow from '../Common/NotebookRow';
import { Note, Notebook } from './../Models';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface NotesScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface NotesScreenState {
  newNote: string;
  notes: Note[];
  notebooks: Notebook[];
  itemIndex: number;
}

class NotesScreen extends React.Component<NotesScreenProps, NotesScreenState> {
  constructor(props: NotesScreenProps) {
    super(props);
    this.state = {
      newNote: '',
      notes: [],
      itemIndex: 0,
      notebooks: [],
    };
  }

  async componentDidMount() {
    const itemIndex = this.props.navigation.getParam('itemIndex');
    try {
      const notebooks: any = await AsyncStorage.getItem('Notebooks');
      const notebook = JSON.parse(notebooks)[itemIndex];
      this.setState(() => ({
        notes: notebook.notes,
        itemIndex,
        notebooks: JSON.parse(notebooks),
      }));
    } catch (error) {
      throw new Error('Unable to get Notebooks');
    }
  }

  onNewNoteChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    this.setState(() => ({ newNote: text }));
  };

  onSaveNote = async () => {
    const { newNote, itemIndex } = this.state;
    if (!newNote) {
      Alert.alert('Blank Notebook ', 'Cannot Save Empty notebook ');
      return;
    }
    try {
      const notebooks: any = await AsyncStorage.getItem('Notebooks');
      const notebooksArray = JSON.parse(notebooks);
      notebooksArray[itemIndex].notes = [
        ...notebooksArray[itemIndex].notes,
        { title: newNote },
      ];
      this.setState(({ notes }) => ({
        notes: [...notes, { title: newNote }],
        newNote: '',
      }));
      await AsyncStorage.setItem('Notebooks', JSON.stringify(notebooksArray));
      Alert.alert('Success ', 'Notebook Saved');
    } catch (error) {
      throw new Error('Unable to store data to async storage');
    }
  };

  onDeleteNote = async (e: GestureResponderEvent, index: number) => {
    const { notes, notebooks, itemIndex } = this.state;
    const updatedNotes = notes;
    updatedNotes.splice(index, 1);
    const updatedNotebooks = notebooks;
    updatedNotebooks[itemIndex].notes = updatedNotes;
    this.setState(() => ({ notes: updatedNotes, notebooks: updatedNotebooks }));
    try {
      await AsyncStorage.setItem('Notebooks', JSON.stringify(updatedNotebooks));
    } catch (error) {
      Alert.alert('Error', 'Unable to delete');
    }
  };

  onEditNotebookTitle = async (index: number, title: string) => {
    const { notes, notebooks, itemIndex } = this.state;
    const updatedNotes = notes;
    updatedNotes[index].title = title;
    const updatedNotebooks = notebooks;
    updatedNotebooks[itemIndex].notes = updatedNotes;
    this.setState(() => ({ notes: updatedNotes, notebooks: updatedNotebooks }));
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
        onDelete={this.onDeleteNote}
        onEdit={this.onEditNotebookTitle}
      />
    );
  };

  render() {
    const { notes, newNote } = this.state;
    return (
      <View style={styles.notebookContainer}>
        <View style={styles.addNotebookContainer}>
          <TextInput
            style={styles.newNotebook}
            placeholder='New Note'
            value={newNote}
            onChange={this.onNewNoteChange}
          />
          <TouchableHighlight
            style={styles.saveButton}
            onPress={this.onSaveNote}
          >
            <Text style={styles.saveButtonText}>Save </Text>
          </TouchableHighlight>
        </View>
        {Boolean(notes.length) && (
          <View style={{ flex: 1 }}>
            <FlatList
              keyboardShouldPersistTaps={'always'}
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
