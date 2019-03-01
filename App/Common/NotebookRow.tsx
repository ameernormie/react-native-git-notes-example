import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface NotebookRowProps {
  item: {
    title: string;
  };
}

interface NotebookRowState {}

class NotebookRow extends React.Component<NotebookRowProps, NotebookRowState> {
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
        <TouchableOpacity
          style={{
            flex: 1,
            width: 75,
            justifyContent: 'center',
            alignItems: 'center',
          }}
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
