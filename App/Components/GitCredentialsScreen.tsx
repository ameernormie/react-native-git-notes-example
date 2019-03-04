import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { NavigationScreenProp, NavigationState } from 'react-navigation';

interface GitCredentialProps {
  navigation: NavigationScreenProp<NavigationState>;
}

interface GitCredentialState {
  username: string;
  password: string;
}

class GitCredentialsScreen extends React.Component<
  GitCredentialProps,
  GitCredentialState
> {
  state = {
    username: '',
    password: '',
  };

  onUsernameChange = ({ nativeEvent: { text } }): void => {
    this.setState(() => ({ username: text }));
  };

  onPasswordChange = ({ nativeEvent: { text } }): void => {
    this.setState(() => ({ password: text }));
  };

  navigateToNotebookHome = () => {
    this.props.navigation.navigate('NotebookHome');
  };

  render() {
    return (
      <View style={styles.landingContainer}>
        <TextInput
          style={styles.credentialFields}
          onChange={this.onUsernameChange}
          placeholder='Username'
        />
        <TextInput
          style={styles.credentialFields}
          onChange={this.onPasswordChange}
          secureTextEntry={true}
          placeholder='Password'
        />
        <TouchableHighlight
          style={styles.loginContainer}
          onPress={this.navigateToNotebookHome}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>
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
  credentialFields: {
    backgroundColor: 'grey',
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 15,
  },
  loginContainer: {
    backgroundColor: 'grey',
    height: 35,
    width: 200,
    margin: 10,
    borderRadius: 10,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 15,
  },
});

export default GitCredentialsScreen;
