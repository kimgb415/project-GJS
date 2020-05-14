import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import BasicInfo from "../pages/basicInfo";

const screens = {
  Login: {
    screen: Login,
  },
  BasicInfo: {
    screen: BasicInfo,
  },
};

const HomeStack = createStackNavigator(screens);
