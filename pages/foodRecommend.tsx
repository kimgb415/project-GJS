import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import OneFood from "../component/oneFood";
import { DimensionConext } from "../context/dimensionContext";
import { Duration } from "../context/howLong";
import sendHttpRequest from "../API/sendHttpRequest";
import { UserId } from "../context/UserId";

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
  const { user } = useContext(UserId);
  const [imageInfo, setImageInfo] = useState([
    {
      num: 1,
      key: "1",
      foodname: "food1",
      source: undefined,
      recipe: "undefined",
    },
    {
      num: 2,
      key: "2",
      foodname: "food2",
      source: undefined,
      recipe: "undefined",
    },
    {
      num: 3,
      key: "3",
      foodname: "food3",
      source: undefined,
      recipe: "undefined",
    },
    {
      num: 4,
      key: "4",
      foodname: "food4",
      source: undefined,
      recipe: "undefined",
    },
    {
      num: 5,
      key: "5",
      foodname: "food5",
      source: undefined,
      recipe: "undefined",
    },
    {
      num: 6,
      key: "6",
      foodname: "food6",
      source: undefined,
      recipe: "undefined",
    },
    {
      num: 7,
      key: "7",
      foodname: "food7",
      source: undefined,
      recipe: "undefined",
    },
  ]);
  const [isLoading, setIsLoaindg] = useState(true);
  const [screenWidth, setScreenWidth] = useState(0);
  const [notClicked, setNotClicked] = useState([{}]);
  const [dimension, setDimension] = useState([
    {
      width: 0,
      heigth: 0,
      x: 0,
      y: 0,
    },
  ]);

  const sendRefresh = (startTime, foodId) => {
    sendHttpRequest(
      "POST",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/06-05-demo/user/event",
      {
        eventName: "refresh",
        time: startTime,
        user: user,
        foodId: foodId,
      }
    );
  };

  const sendItemClicked = (startTime, foodId) => {
    sendHttpRequest(
      "POST",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/06-05-demo/user/event",
      {
        eventName: "itemClicked",
        time: startTime,
        user: user,
        foodId: foodId,
      }
    );
  };

  const fetchData = async () => {
    let result = [{}];
    for (let i = 0; i < 7; i++) {
      await fetch(
        "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_05_04/food-info"
      )
        .then((res) => res.json())
        .then((res) => {
          let single = {
            num: i + 1,
            key: res["body"]["id"],
            foodname: res["body"]["name"],
            source: res["body"]["main_img"],
            recipe: res["body"]["step_1"],
          };
          result[i] = single;
        });
    }
    setScreenWidth(Math.round(Dimensions.get("screen").width));
    setImageInfo(result);
    setNotClicked(result);
    setIsLoaindg(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <View style={{ flex: 1 }}>
          {/* <Text style={{ fontSize: 100 }}>{duration}</Text> */}
          <View style={{ flex: 1 }}>
            <Button
              title="Refresh"
              onPress={() => {
                let startTime = new Date();
                let foodId = "";
                for (let i = 0; i < notClicked.length; i++) {
                  foodId += `${notClicked[i].key},`;
                }
                sendRefresh(startTime, foodId);
                setIsLoaindg(true);
                fetchData();
              }}
            />
          </View>
          <View style={{ flex: 5 }}>
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
                    sendItemClicked(startTime, food.item.key);
                    setNotClicked((notClicked) => {
                      return notClicked.filter(
                        (item) => item.key !== food.item.key
                      );
                    });
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
        </View>
      )}
    </View>
  );
}
