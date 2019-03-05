import { createAppContainer, createStackNavigator } from 'react-navigation';
import GitCredentialsScreen from '../Components/GitCredentialsScreen';
import LandingScreen from '../Components/LandingScreen';
import NotebookDetail from '../Components/NotebookDetail';
import NotebookScreen from '../Components/NotebookScreen';
import NotesScreen from '../Components/NotesScreen';
import SearchGistsScreen from '../Components/SearchGistsScreen';

const AppNavigator = createStackNavigator({
  LandingScreen,
  LoginScreen: GitCredentialsScreen,
  NotebookHome: NotebookScreen,
  NotebookDetail,
  SearchGists: SearchGistsScreen,
  NotesScreen,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
