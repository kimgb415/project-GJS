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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default function FoodRecommend({ navigation }) {
  const { imageSourceUpdate, currentUpdate } = useContext(DimensionConext);
  const [imageInfo, setImageInfo] = useState([
    { key: "1", foodname: "food1", source: undefined, recipe: "undefined" },
    { key: "2", foodname: "food2", source: undefined, recipe: "undefined" },
    { key: "3", foodname: "food3", source: undefined, recipe: "undefined" },
    { key: "4", foodname: "food4", source: undefined, recipe: "undefined" },
  ]);
  const [isLoading, setIsLoaindg] = useState(true);
  const [dimension, setDimension] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      let result = [{}, {}, {}, {}];
      for (let i = 0; i < 4; i++) {
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
        <View style={{ flex: 1 }}>
          <FlatList
            style={{ flex: 1 }}
            keyExtractor={(item, index) => item.key}
            data={imageInfo}
            renderItem={({ item }) => (
              <View
                onLayout={(e) => {
                  setDimension([
                    ...dimension,
                    {
                      key: item.key,
                      width: e.nativeEvent.layout.width,
                      height: e.nativeEvent.layout.height,
                      x: e.nativeEvent.layout.x,
                      y: e.nativeEvent.layout.y,
                    },
                  ]);
                }}
                style={{ flex: 1 }}
              >
                <TouchableOpacity
                  style={{ flex: 1 }}
                  onPress={() => {
                    currentUpdate(
                      dimension.filter((single) => single.key == item.key)
                    );
                    imageSourceUpdate(item.source);
                    navigation.navigate("OnlyOneFood", item);
                  }}
                >
                  <OneFood foodSource={item} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}
