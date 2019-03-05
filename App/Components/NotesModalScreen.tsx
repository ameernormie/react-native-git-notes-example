import React from 'react';
import { AsyncStorage, Text, View, Button } from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface NotesModalProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface NotesModalState {}

class NotesModalScreen extends React.Component<
  NotesModalProps,
  NotesModalState
> {
  async componentDidMount() {
    try {
      const notebooks: any = await AsyncStorage.getItem('Notebooks');
      // const notebook = JSON.parse(notebooks)[itemIndex];
      // this.setState(() => ({
      //   notes: notebook.notes,
      //   itemIndex,
      //   notebooks: JSON.parse(notebooks),
      // }));
    } catch (error) {
      throw new Error('Unable to get Notebooks');
    }
  }

  onDismissModal = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Modal</Text>
        <Button title='Dismiss' onPress={this.onDismissModal} />
      </View>
    );
  }
}

export default NotesModalScreen;
