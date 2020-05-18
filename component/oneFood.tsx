import React, { useState } from "react";
import { Image, View, Text } from "react-native";
import Food from "./foodClass";

const OneFood = (props) => {
  const [widthValue, setWidthValue] = useState(100);
  const [heightValue, setHeightValue] = useState(100);
  const food = new Food(
    props.foodSource.key,
    props.foodSource.foodname,
    ["undefined"],
    props.foodSource.source
  );

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View
        onLayout={(event) => {
          setWidthValue(event.nativeEvent.layout.width);
          setHeightValue(event.nativeEvent.layout.height);
        }}
        style={{ flex: 5, margin: 10 }}
      >
        <Image
          style={{ width: widthValue, height: heightValue }}
          source={{
            uri: `data:image/png;base64,${food.image}`,
          }}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <Text>{food.name}</Text>
      </View>
    </View>
  );
};

export default OneFood;
