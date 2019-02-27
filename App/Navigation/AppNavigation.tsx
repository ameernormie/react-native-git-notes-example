import { createAppContainer, createStackNavigator } from "react-navigation";
import LandingScreen from "../Components/LandingScreen";

const AppNavigator = createStackNavigator({
  LandingScreen: LandingScreen
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
