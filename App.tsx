import "react-native-gesture-handler";
import * as React from "react";
import { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import BasicInfo from "./pages/basicInfo";
import FoodSelect from "./pages/foodSelect";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "./component/map";
import Main from "./pages/main";
import FoodRecommend from "./pages/foodRecommend";
import Recipe from "./pages/recipe";
import OnlyOneFood from "./pages/onlyOneFood";
import UserIdProvider from "./context/UserId";
import Login from "./pages/login";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <UserIdProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ gestureEnabled: false }}
            />
            <Stack.Screen
              name="BasicInfo"
              component={BasicInfo}
              options={{
                gestureEnabled: false,
                headerLeft: () => {
                  <View></View>;
                },
              }}
            />
            <Stack.Screen
              name="FoodSelect"
              component={FoodSelect}
              options={{
                gestureEnabled: false,
                headerLeft: () => {
                  <View></View>;
                },
              }}
            />
            <Stack.Screen
              name="Main"
              component={Main}
              options={{
                gestureEnabled: false,
                headerLeft: () => {
                  <View></View>;
                },
              }}
            />
            <Stack.Screen name="FoodRecommend" component={FoodRecommend} />
            <Stack.Screen name="OnlyOneFood" component={OnlyOneFood} />
            <Stack.Screen name="Map" component={Map} />
            <Stack.Screen name="Recipe" component={Recipe} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserIdProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
