import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, Button, Platform, Text } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import OneFood from "../component/oneFood";
import { Duration } from "../context/howLong";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 5,
  },

  image: {
    flex: 4,
    padding: 10,
    margin: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    flex: 1,
    margin: 10,
    padding: 10,
    justifyContent: "space-around",
  },

  button: {
    padding: 10,
  },
});

let defaultRestaurant = require("./defaultRestaurant.json");

export default function OnlyOneFood({ route, navigation }) {
  const [restaurant, setRestaurant] = useState([defaultRestaurant]);
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [errorMsg, setErrorMsg] = useState("null");
  const [disabled, setDisabled] = useState(true);
  const APIkey = "AIzaSyBJ_X6v3VjNA_02BHcs0bOTblwZ3kuQWPQ";

  const { duration, startUpdate, durationUpdate } = useContext(Duration);

  useEffect(() => {
    if (Platform.OS === "android" && !Constants.isDevice) {
      setErrorMsg(
        "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      );
    } else {
      (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
        }

        let location = await Location.getLastKnownPositionAsync({});
        setLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        await fetch(
          `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&key=${APIkey}&region=1000&location=${location.latitude},${location.longitude}`
        )
          .then((response) => response.json())
          .then((res) => {
            setRestaurant(res.results);
            setDisabled(false);
          });
      })();
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <OneFood foodSource={route.params} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button
              title="Recipe"
              onPress={() => navigation.navigate("Recipe")}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Restaurant"
              disabled={disabled}
              onPress={() =>
                navigation.navigate("Map", {
                  location: location,
                  restaurant: restaurant,
                })
              }
            />
          </View>
        </View>
      </View>
      <Text>{restaurant[0].name}</Text>
    </View>
  );
}
