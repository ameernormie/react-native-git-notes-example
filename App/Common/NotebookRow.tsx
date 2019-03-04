import React from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface NotebookRowProps {
  item: {
    title: string;
  };
}

interface NotebookRowState {
  modalVisible: boolean;
}

class NotebookRow extends React.Component<NotebookRowProps, NotebookRowState> {
  state = {
    modalVisible: false,
  };
  setModalVisibility = () => {
    this.setState(({ modalVisible }) => ({ modalVisible: !modalVisible }));
  };
  render() {
    const { item } = this.props;
    return (
      <View style={styles.rowContainer}>
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
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}
          >
            <View>
              <TextInput placeholder='New Title' />

              <TouchableOpacity onPress={this.setModalVisibility}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableOpacity
          style={{
            flex: 1,
            width: 75,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={this.setModalVisibility}
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
      </View>
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
