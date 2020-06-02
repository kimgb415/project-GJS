import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
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
  const { foodIdUpdate } = useContext(Duration);
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
        <View style={{ flex: 3 }}>
          <View style={{ flex: 1 }}>
            <FlatList
              style={{ height: "100%" }}
              keyExtractor={(item, index) => item.key}
              data={imageInfo}
              renderItem={(food) => (
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    imageSourceUpdate(food.item.source);
                    foodIdUpdate(food.item.key);
                    navigation.navigate("OnlyOneFood", food.item);
                  }}
                  onLayout={(e) => {
                    setDimension([
                      {
                        width: e.nativeEvent.layout.width,
                        heigth: e.nativeEvent.layout.height,
                        x: e.nativeEvent.layout.x,
                        y: e.nativeEvent.layout.y,
                      },
                    ]);
                  }}
                >
                  <OneFood foodSource={food.item} imageDimension={dimension} />
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      )}
    </View>
  );
}
