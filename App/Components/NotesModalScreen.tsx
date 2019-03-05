import React from 'react';
import {
  Alert,
  AsyncStorage,
  Button,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';
import { Note, Notebook } from '../Models';

interface NotesModalProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface NotesModalState {
  note: Note;
  newContent: string;
  noteIndex: number;
  notebookIndex: number;
}

class NotesModalScreen extends React.Component<
  NotesModalProps,
  NotesModalState
> {
  state = {
    note: {
      title: '',
      content: '',
    },
    newContent: '',
    noteIndex: 0,
    notebookIndex: 0,
  };

  componentDidMount() {
    const note = this.props.navigation.getParam('note');
    const noteIndex = this.props.navigation.getParam('noteIndex');
    const notebookIndex = this.props.navigation.getParam('notebookIndex');
    this.setState(() => ({ note, noteIndex, notebookIndex }));
  }

  onNoteContentChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    this.setState(() => ({ newContent: text }));
  };

  onAddContent = async () => {
    const { newContent, noteIndex, notebookIndex, note } = this.state;
    if (!newContent) {
      Alert.alert('Blank Content ', 'Cannot Save Empty content ');
      return;
    }
    try {
      const notebooks: any = await AsyncStorage.getItem('Notebooks');
      const notebooksArray: Notebook = JSON.parse(notebooks);
      notebooksArray[notebookIndex].notes[noteIndex] = {
        ...note,
        content: newContent,
      };
      this.setState(({ note }) => ({ note: { ...note, content: newContent } }));
      await AsyncStorage.setItem('Notebooks', JSON.stringify(notebooksArray));
      Alert.alert('Success ', 'Content Saved');
    } catch (error) {
      throw new Error('Unable to store data to async storage');
    }
  };

  onDismissModal = () => {
    this.props.navigation.goBack();
  };

  render() {
    const { note, newContent } = this.state;
    const ContentView = Boolean(note.content) ? (
      <React.Fragment>
        <Text>{note.content}</Text>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <TextInput
          placeholder='Write Content'
          value={newContent}
          onChange={this.onNoteContentChange}
        />
        <Button title='Add Content' onPress={this.onAddContent} />
      </React.Fragment>
    );
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>{note.title}</Text>
        <View style={styles.contentView}>{ContentView}</View>
        <Button title='Dismiss' onPress={this.onDismissModal} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentView: {
    height: 200,
    width: 300,
    backgroundColor: '#eee',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});

export default NotesModalScreen;
