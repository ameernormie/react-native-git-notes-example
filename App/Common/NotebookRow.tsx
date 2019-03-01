import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class NotebookRow extends React.Component {
  render() {
    return (
      <View style={styles.rowContainer}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 10,
          }}
        >
          <Text style={styles.rowTitle}>Notebook Title</Text>
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
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    width: 250,
  },
  rowTitle: {
    marginHorizontal: 5,
    fontSize: 15,
    color: '#eee',
  },
});

export default NotebookRow;
