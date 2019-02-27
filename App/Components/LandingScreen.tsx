import React from "react";
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { NavigationScreenProps, NavigationActions } from "react-navigation";

interface LandingScreenProps {
  navigation: NavigationScreenProps;
}

class LandingScreen extends React.Component<LandingScreenProps, {}> {
  navigateToLogin = e => {
    this.props.navigation.navigate("LoginScreen");
  };
  navigateToSearchPage = e => {
    this.props.navigation.navigate("SearchGists");
  };
  render() {
    return (
      <View style={styles.landingContainer}>
        <TouchableHighlight
          style={styles.landingButtons}
          onPress={this.navigateToLogin}
        >
          <Text style={styles.buttonText}>Login with Git</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.landingButtons}
          onPress={this.navigateToSearchPage}
        >
          <Text style={styles.buttonText}> Search Gists</Text>
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
    justifyContent: "center",
    alignItems: "center"
  },
  landingButtons: {
    backgroundColor: "grey",
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10
  },
  buttonText: {
    fontSize: 20,
    alignSelf: "center"
  }
});

export default LandingScreen;
