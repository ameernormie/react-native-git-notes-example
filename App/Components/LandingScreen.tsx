import React from "react";
import { View, TouchableHighlight, Text, StyleSheet } from "react-native";

class LandingScreen extends React.Component<{}, {}> {
  render() {
    return (
      <View style={styles.landingContainer}>
        <TouchableHighlight style={styles.landingButtons}>
          <Text>Login with Git</Text>
        </TouchableHighlight>
        <TouchableHighlight style={styles.landingButtons}>
          <Text>Search Gists</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: "#eee",
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  landingButtons: {
    backgroundColor: "grey"
  }
});

export default LandingScreen;
