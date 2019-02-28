import { createAppContainer, createStackNavigator } from 'react-navigation';
import GitCredentialsScreen from '../Components/GitCredentialsScreen';
import LandingScreen from '../Components/LandingScreen';
import NotebookDetail from '../Components/NotebookDetail';
import NotebookScreen from '../Components/NotebookScreen';
import SearchGistsScreen from '../Components/SearchGistsScreen';

const LoginStack = createStackNavigator({
  LoginScreen: GitCredentialsScreen,
  NotebookHome: NotebookScreen,
  NotebookDetail,
});

const GistStack = createStackNavigator({
  SearchGists: SearchGistsScreen,
});

const AppNavigator = createStackNavigator({
  LandingScreen,
  MainNav: LoginStack,
  GistsNav: GistStack,
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
