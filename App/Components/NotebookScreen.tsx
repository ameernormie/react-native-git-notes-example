import React from "react";
import {
  SectionList,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from "react-native";

interface NotebookScreenProps {}

interface NotebookScreenState {
  newNotebookName: string;
}

class NotebookScreen extends React.Component<
  NotebookScreenProps,
  NotebookScreenState
> {
  state = {
    newNotebookName: ""
  };
  onNewNotebookChange = ({ nativeEvent: { text } }) => {
    this.setState(() => ({ newNotebookName: text }));
  };
  onSaveNotebook = e => {};
  render() {
    return (
      <View style={styles.notebookContainer}>
        <TextInput placeholder="Gist Search" />
        <View style={styles.addNotebookContainer}>
          <TextInput
            style={styles.newNotebook}
            placeholder="New Notebook"
            onChange={this.onNewNotebookChange}
          />
          <TouchableHighlight
            style={styles.saveButton}
            onPress={this.onSaveNotebook}
          >
            <Text style={styles.saveButtonText}>Save </Text>
          </TouchableHighlight>
        </View>
        <SectionList
          renderItem={({ item, index, section }) => (
            <Text key={index}>{item}</Text>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={{ fontWeight: "bold" }}>{title}</Text>
          )}
          sections={[
            { title: "Title1", data: ["item1", "item2"] },
            { title: "Title2", data: ["item3", "item4"] },
            { title: "Title3", data: ["item5", "item6"] }
          ]}
          keyExtractor={(item, index) => item + index}
        />
        <Text>Here comes the list</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  notebookContainer: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center"
  },
  addNotebookContainer: {
    height: 60,
    width: 200,
    backgroundColor: "transparent"
  },
  newNotebook: {
    height: 35,
    width: 200,
    backgroundColor: "grey"
  },
  saveButton: {
    height: 20,
    width: 70,
    backgroundColor: "grey",
    alignSelf: "flex-end",
    borderRadius: 5
  },
  saveButtonText: {
    fontSize: 15,
    textAlign: "center"
  }
});

export default NotebookScreen;
