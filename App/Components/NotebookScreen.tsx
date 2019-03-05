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
import { Notebook } from './../Models';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface NotebookScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface NotebookScreenState {
  newNotebookName: string;
  notebooks: Notebook[];
}

class NotebookScreen extends React.Component<
  NotebookScreenProps,
  NotebookScreenState
> {
  constructor(props: NotebookScreenProps) {
    super(props);
    this.state = {
      newNotebookName: '',
      notebooks: [],
    };
  }

  async componentDidMount() {
    try {
      const notebooks: any = await AsyncStorage.getItem('Notebooks');
      if (!JSON.parse(notebooks)) {
        const notebookArray: Notebook[] = [];
        await AsyncStorage.setItem('Notebooks', JSON.stringify(notebookArray));
      } else {
        this.setState(() => ({ notebooks: JSON.parse(notebooks) }));
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
      this.setState(({ notebooks }) => ({
        notebooks: [...notebooks, { title: newNotebookName, notes: [] }],
        newNotebookName: '',
      }));
      await AsyncStorage.setItem('Notebooks', JSON.stringify(notebooksArray));
      Alert.alert('Success ', 'Notebook Saved');
    } catch (error) {
      throw new Error('Unable to store data to async storage');
    }
  };

  onDeleteNotebook = async (e: GestureResponderEvent, index: number) => {
    const { notebooks } = this.state;
    const updatedNotebooks = notebooks;
    updatedNotebooks.splice(index, 1);
    this.setState(() => ({ notebooks: updatedNotebooks }));
    try {
      await AsyncStorage.setItem('Notebooks', JSON.stringify(updatedNotebooks));
    } catch (error) {
      Alert.alert('Error', 'Unable to delete');
    }
  };

  onEditNotebookTitle = async (index: number, title: string) => {
    const { notebooks } = this.state;
    const updatedNotebooks = notebooks;
    updatedNotebooks[index].title = title;
    try {
      await AsyncStorage.setItem('Notebooks', JSON.stringify(updatedNotebooks));
    } catch (error) {
      Alert.alert('Error', 'Unable to Edit Title');
    }
  };

  onNotebookPress = (e: GestureResponderEvent, index: number) => {
    this.props.navigation.navigate('NotesScreen', { itemIndex: index });
  };

  renderNotebook = (item: any, index: any) => {
    return (
      <NotebookRow
        item={item}
        index={index}
        onDelete={this.onDeleteNotebook}
        onEdit={this.onEditNotebookTitle}
        onRowPress={this.onNotebookPress}
      />
    );
  };

  keyExtractor = (item: Notebook, index: number) => String(index);

  render() {
    const { notebooks, newNotebookName } = this.state;
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
            value={newNotebookName}
            onChange={this.onNewNotebookChange}
          />
          <TouchableHighlight
            style={styles.saveButton}
            onPress={this.onSaveNotebook}
          >
            <Text style={styles.saveButtonText}>Save </Text>
          </TouchableHighlight>
        </View>
        {Boolean(notebooks.length) && (
          <View style={{ flex: 1 }}>
            <FlatList
              data={notebooks}
              renderItem={({ item, index }) => this.renderNotebook(item, index)}
              keyExtractor={this.keyExtractor}
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
    paddingHorizontal: 30,
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
