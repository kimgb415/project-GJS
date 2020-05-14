import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AllFood from "../component/allFood";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    padding: 5,
    alignContent: "center",
  },
});

export default function FoodRecommend({ navigation }) {
  const [imageInfo, setImageInfo] = useState([
    { key: "1", foodname: "food1", source: undefined },
    { key: "2", foodname: "food2", source: undefined },
    { key: "3", foodname: "food3", source: undefined },
    { key: "4", foodname: "food4", source: undefined },
  ]);
  const [isLoading, setIsLoaindg] = useState(true);

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
          <AllFood allInfo={imageInfo} navigation={navigation} />
        </View>
      )}
    </View>
  );
}
