import { createAppContainer, createStackNavigator } from 'react-navigation';
import GitCredentialsScreen from '../Components/GitCredentialsScreen';
import LandingScreen from '../Components/LandingScreen';
import NotebookScreen from '../Components/NotebookScreen';
import NotesModalScreen from '../Components/NotesModalScreen';
import NotesScreen from '../Components/NotesScreen';
import SearchGistsScreen from '../Components/SearchGistsScreen';

const MainStack = createStackNavigator(
  {
    LandingScreen,
    LoginScreen: GitCredentialsScreen,
    NotebookHome: NotebookScreen,
    SearchGists: SearchGistsScreen,
    NotesScreen,
  },
  {
    initialRouteName: 'LandingScreen',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainStack,
    },
    NotesModal: {
      screen: NotesModalScreen,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

const AppContainer = createAppContainer(RootStack);

export default AppContainer;
