import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface NotebookDetailProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface NotebookDetailState {}

class NotebookDetail extends React.Component<
  NotebookDetailProps,
  NotebookDetailState
> {
  render() {
    return (
      <View style={styles.notebookContainer}>
        <Text>Title of Notebook</Text>
        <TextInput placeholder='Text field to save new notes' />
        <TouchableHighlight>
          <Text>Save</Text>
        </TouchableHighlight>

        <Text>List of Notes</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notebookContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
});

export default NotebookDetail;
