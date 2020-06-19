import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Button, Text, Slider } from "react-native";
import FoodWorldCup from "../component/foodWorldCup";
import RatingSlider from "../component/slider";
import { UserId } from "../context/UserId";
import sendHttpRequest from "../API/sendHttpRequest";
import { Case } from "../context/caseContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: 10,
    justifyContent: "space-around",
  },
  submitButton: {
    height: 40,
    width: 90,
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
  const [buttonSetting, setButtonSetting] = useState(true);
  const { user } = useContext(UserId);
  const { mode } = useContext(Case);
  const [results, setResults] = useState({
    mode: mode,
    user: user,
    result: { id: "", rating: 0 },
  });

  const pressHandler = () => {
    sendHttpRequest(
      "PUT",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/06-05-demo/user/rating",
      results
    );
    setCounting(counting + 1);
    if (counting >= 5) navigation.navigate("FoodRecommend");
    setSliderSetting(true);
  };

  const slidingHandler = (value: number) => {
    setResults({
      mode: mode,
      user: user,
      result: { id: imageInfo.key, rating: value },
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/06-05-demo/food-info?id=${user}&mode=${mode}`
      )
        .then((res) => res.json())
        .then((res) => {
          setImageInfo({
            key: res["body"]["id"],
            foodname: res["body"]["name"],
            source: res["body"]["main_img"],
          });
          setResults({
            mode: mode,
            user: user,
            result: { id: res["body"]["id"], rating: 3 },
          });
        });
      setSliderSetting(false);
      setButtonSetting(false);
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
        <Button
          disabled={buttonSetting}
          title="Submit"
          onPress={pressHandler}
        />
      </View>
    </View>
  );
}
