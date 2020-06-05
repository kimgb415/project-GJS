import "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import BasicInfo from "../pages/basicInfo";
import FoodSelect from "../pages/foodSelect";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Map from "../component/map";
import Main from "../pages/main";
import FoodRecommend from "../pages/foodRecommend";
import Recipe from "../pages/recipe";
import OnlyOneFood from "../pages/onlyOneFood";
import { UserId } from "../context/UserId";
import Login from "../pages/login";
import { Duration } from "../context/howLong";
import DimensionProvider from "../context/dimensionContext";
import sendHttpRequest from "../API/sendHttpRequest";

const Stack = createStackNavigator();

export default function Routes() {
  const { user, device, location } = useContext(UserId);
  const { foodId, duration, durationUpdate } = useContext(Duration);
  const [durationInfo, setDurationInfo] = useState({
    foodId: null,
    user: null,
    time: 0,
    location: {},
    device: "unknown",
  });

  // const sendDuratoinInformation = () => {
  //   setDurationInfo({
  //     foodId: foodId,
  //     user: user,
  //     time: duration,
  //     device: device,
  //     location: location,
  //   });
  //   sendHttpRequest("Post", "uri", durationInfo);
  // };

  const sendFavourite = (time, foodId) => {
    sendHttpRequest("POST", "uri", {
      eventName: "favourite",
      time: time,
      user: user,
      foodId: foodId,
    });
  };

  // const forFade = ({ current, closing }) => ({
  //   cardStyle: {
  //     opacity: current.progress,
  //   },
  //   overlayStyle: {
  //     opacity: 1 - current.progress,
  //   },
  // });
  // const config = {
  //   animation: "timing",
  //   config: {
  //     duration: 2000,
  //   },
  // };

  return (
    <DimensionProvider>
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
          <Stack.Screen
            name="Recipe"
            component={Recipe}
            options={({ navigation }) => {
              return {
                // headerLeft: () => (
                //   <TouchableOpacity
                //     onPress={() => {
                //       let end = new Date();
                //       durationUpdate(end);
                //       sendDuratoinInformation();
                //       navigation.navigate("FoodRecommend");
                //     }}
                //   >
                //     <Text>Back</Text>
                //   </TouchableOpacity>
                // ),
                headerRight: () => (
                  <TouchableOpacity
                    onPress={() => {
                      let time = new Date();
                      sendFavourite(time, foodId);
                    }}
                  >
                    <Text>Favourite</Text>
                  </TouchableOpacity>
                ),
                gestureEnabled: false,
              };
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DimensionProvider>
  );
}
