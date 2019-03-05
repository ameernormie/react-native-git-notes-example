import React from 'react';
import {
  Alert,
  Dimensions,
  GestureResponderEvent,
  Modal,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface NotebookRowProps {
  item: {
    title: string;
  };
  index: number;
  onDelete: (e: GestureResponderEvent, index: number) => void;
  onEdit: (index: number, title: string) => void;
  onRowPress?: (e: GestureResponderEvent, index: number) => void;
  notesListEnabled?: boolean;
}

interface NotebookRowState {
  modalVisible: boolean;
  newTitle: string;
}

class NotebookRow extends React.Component<NotebookRowProps, NotebookRowState> {
  state = {
    modalVisible: false,
    newTitle: '',
  };

  static defaultProps = {
    onRowPress: (e: GestureResponderEvent, index: number) => {},
    notesListEnabled: false,
  };

  setModalVisibility = () => {
    this.setState(({ modalVisible }) => ({ modalVisible: !modalVisible }));
  };

  onNotebookTitleChange = ({
    nativeEvent: { text },
  }: NativeSyntheticEvent<TextInputChangeEventData>): void => {
    this.setState(() => ({ newTitle: text }));
  };

  onSaveNewTitle = (e: GestureResponderEvent) => {
    e.preventDefault();
    const { newTitle } = this.state;
    if (Boolean(newTitle)) {
      this.props.onEdit(this.props.index, newTitle);
      this.setState(() => ({ modalVisible: false, newTitle: '' }));
    } else {
      Alert.alert('Blank Title', 'Title cannot be blank');
    }
  };

  render() {
    const { item, notesListEnabled } = this.props;

    // const ListRow = notesListEnabled
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={e => this.props.onRowPress(e, this.props.index)}
      >
        <View
          style={{
            flex: 5,
            backgroundColor: 'transparent',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingLeft: 20,
          }}
        >
          <Text style={styles.rowTitle}>{item.title}</Text>
        </View>

        <Modal
          animationType='slide'
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}
          >
            <TextInput
              placeholder='New Title'
              onChange={this.onNotebookTitleChange}
            />

            <TouchableOpacity onPress={this.onSaveNewTitle}>
              <Text>Save</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            flex: 1,
            width: 75,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={e => this.props.onDelete(e, this.props.index)}
        >
          <Icon name={'trash'} color={'red'} style={{ fontSize: 20 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            width: 75,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.setModalVisibility}
        >
          <Icon name={'edit'} color={'blue'} style={{ fontSize: 20 }} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 0,
    width: SCREEN_WIDTH,
    flexDirection: 'row',
  },
  rowTitle: {
    marginHorizontal: 5,
    fontSize: 15,
    color: 'black',
  },
});

export default NotebookRow;
