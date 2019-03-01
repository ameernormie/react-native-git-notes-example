import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface LandingScreenProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface LandingScreenState {}

class LandingScreen extends React.Component<
  LandingScreenProps,
  LandingScreenState
> {
  navigateToLogin = () => {
    this.props.navigation.navigate('LoginScreen');
  };
  navigateToSearchPage = () => {
    this.props.navigation.navigate('SearchGists');
  };
  render() {
    return (
      <View style={styles.landingContainer}>
        <TouchableOpacity
          style={styles.landingButtons}
          onPress={this.navigateToLogin}
        >
          <Text style={styles.buttonText}>
            Login with Git <Icon name='github' size={30} color='black' />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.landingButtons}
          onPress={this.navigateToSearchPage}
        >
          <Text style={styles.buttonText}>Search Gists</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    backgroundColor: '#eee',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  landingButtons: {
    backgroundColor: 'grey',
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default LandingScreen;
