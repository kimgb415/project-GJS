import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button, Text, Slider } from "react-native";
import FoodWorldCup from "../component/foodWorldCup";
import RatingSlider from "../component/slider";
import { UserId } from "../context/UserId";
import sendHttpRequest from "../API/sendHttpRequest";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: 10,
    justifyContent: "space-around",
  },
  submitButton: {
    flex: 1,
    flexDirection: "row-reverse",
  },
});

export default function FoodSelect({ navigation }) {
  const [imageInfo, setImageInfo] = useState({
    key: "1",
    foodname: "food1",
    source: undefined,
  });
  const [counting, setCounting] = useState(0);
  const [sliderSetting, setSliderSetting] = useState(true);
  const { user } = useContext(UserId);
  const [results, setResults] = useState({
    user: user,
    result: { id: "", rating: 0 },
  });

  const pressHandler = () => {
    sendHttpRequest(
      "PUT",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_05_12/user/rating",
      results
    );
    setCounting(counting + 1);
    if (counting >= 8) navigation.navigate("FoodRecommend");
    setSliderSetting(true);
  };

  const slidingHandler = (value: number) => {
    setResults({
      user: user,
      result: { id: imageInfo.key, rating: value },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_05_04/food-info"
      )
        .then((res) => res.json())
        .then((res) => {
          setImageInfo({
            key: res["body"]["id"],
            foodname: res["body"]["RCP_NM"],
            source: res["body"]["image_data"]["ATT_FILE_NO_MK"],
          });
        });
      setSliderSetting(false);
    };
    fetchData();
  }, [counting]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <FoodWorldCup navigation={navigation} foodSource={imageInfo} />
        <Text>{imageInfo.key}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <RatingSlider
          onSlidingComplete={slidingHandler}
          sliderSetting={sliderSetting}
        />
      </View>
      <View style={styles.submitButton}>
        <Button title="Submit" onPress={pressHandler} />
      </View>
    </View>
  );
}
