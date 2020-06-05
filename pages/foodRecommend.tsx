import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import OneFood from "../component/oneFood";
import { DimensionConext } from "../context/dimensionContext";
import { Duration } from "../context/howLong";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 5,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default function FoodRecommend({ navigation }) {
  const { imageSourceUpdate } = useContext(DimensionConext);
  const { duration, startUpdate, foodIdUpdate } = useContext(Duration);
  const [imageInfo, setImageInfo] = useState([
    { key: "1", foodname: "food1", source: undefined, recipe: "undefined" },
    { key: "2", foodname: "food2", source: undefined, recipe: "undefined" },
    { key: "3", foodname: "food3", source: undefined, recipe: "undefined" },
    { key: "4", foodname: "food4", source: undefined, recipe: "undefined" },
    { key: "5", foodname: "food5", source: undefined, recipe: "undefined" },
    { key: "6", foodname: "food6", source: undefined, recipe: "undefined" },
    { key: "7", foodname: "food7", source: undefined, recipe: "undefined" },
  ]);
  const [isLoading, setIsLoaindg] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [dimension, setDimension] = useState([
    {
      width: 0,
      heigth: 0,
      x: 0,
      y: 0,
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      let result = [{}];
      for (let i = 0; i < 7; i++) {
        await fetch(
          "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_05_04/food-info"
        )
          .then((res) => res.json())
          .then((res) => {
            let single = {
              key: res["body"]["id"],
              foodname: res["body"]["RCP_NM"],
              source: res["body"]["image_data"]["ATT_FILE_NO_MK"],
              recipe: res["body"]["MANUAL01"],
            };
            result[i] = single;
          });
      }
      setScreenWidth(Math.round(Dimensions.get("screen").width));
      setImageInfo(result);
      setIsLoaindg(false);
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flex: 1 }}>
          {/* <Text style={{ fontSize: 100 }}>{duration}</Text> */}
          <FlatList
            style={{ height: "100%" }}
            keyExtractor={(item, index) => item.key}
            data={imageInfo}
            renderItem={(food) => (
              <TouchableOpacity
                style={{ height: screenWidth * 0.75, width: screenWidth }}
                onPress={() => {
                  let startTime = new Date();
                  startUpdate(startTime);
                  imageSourceUpdate(food.item.source);
                  foodIdUpdate(food.item.key);
                  navigation.navigate("Recipe", food.item);
                }}
                onLayout={(e) => {
                  setDimension([
                    {
                      width: screenWidth,
                      heigth: screenWidth * 0.75,
                      x: e.nativeEvent.layout.x,
                      y: e.nativeEvent.layout.y,
                    },
                  ]);
                }}
              >
                <OneFood foodSource={food.item} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
}
