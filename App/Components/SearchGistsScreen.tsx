import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
  TextInputChangeEventData
} from "react-native";
import { NavigationScreenProps } from "react-navigation";

interface SearchGistsProps {
  navigation: NavigationScreenProps;
}

interface SearchGistsState {
  username: string;
  password: string;
}

class SearchGistsScreen extends React.Component<
  SearchGistsProps,
  SearchGistsState
> {
  state = {
    username: "",
    password: ""
  };
  render() {
    return (
      <View style={styles.landingContainer}>
        <TextInput
          style={styles.credentialFields}
          placeholder="Search By Gist ID"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  credentialFields: {
    backgroundColor: "grey",
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 15
  },
  loginContainer: {
    backgroundColor: "grey",
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10
  },
  loginText: {
    textAlign: "center",
    fontSize: 15
  }
});

export default SearchGistsScreen;
