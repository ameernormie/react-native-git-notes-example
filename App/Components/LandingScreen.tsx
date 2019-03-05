import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  WebView,
} from 'react-native';
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
  state = {
    showWeb: false,
  };

  navigateToLogin = () => {
    // return <MyWeb />;
    // this.setState({ showWeb: true });
    this.props.navigation.navigate('LoginScreen');
  };

  navigateToSearchPage = () => {
    this.props.navigation.navigate('SearchGists');
  };

  render() {
    const { showWeb } = this.state;
    return (
      <View style={styles.landingContainer}>
        {showWeb && (
          <WebView
            source={{ uri: 'https://github.com/login' }}
            style={{ flex: 1, height: 100, width: 250 }}
            onMessage={e => console.log('web view console ', e)}
            onNavigationStateChange={e => console.log('webview navigation ', e)}
          />
        )}
        {!showWeb && (
          <>
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
          </>
        )}
      </View>
    );
  }
}

function MyWeb() {
  return (
    <WebView
      source={{ uri: 'https://github.com/facebook/react-native' }}
      style={{ marginTop: 20 }}
    />
  );
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
