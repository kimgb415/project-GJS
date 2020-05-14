import React, { useState } from "react";
import { View, FlatList } from "react-native";
import FoodItem from "./fooditem";
import FoodInput from "./foodInput";

export default function TimeLine() {
  const [foodTimeLine, setFoodTimeline] = useState([]);

  const addFoodHandler = (enteredFood) => {
    setFoodTimeline((foodTimeLine) => [
      ...foodTimeLine,
      { id: Math.random().toString(), value: enteredFood },
    ]);
  };

  const removeFoodItem = (foodItemId) => {
    setFoodTimeline((foodTimeLine) => {
      return foodTimeLine.filter((foodItem) => foodItem.id !== foodItemId);
    });
  };

  return (
    <View style={{ justifyContent: "center" }}>
      <FoodInput onAddFood={addFoodHandler} />
      <FlatList
        keyExtractor={(item, index) => item.id}
        data={foodTimeLine}
        renderItem={(itemData) => (
          <FoodItem
            id={itemData.item.id}
            onDelete={removeFoodItem}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  );
}
