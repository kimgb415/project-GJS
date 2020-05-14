import React, { useState } from "react";
import { Image, View, Text } from "react-native";

const OneFood = (props) => {
  const [widthValue, setWidthValue] = useState(100);
  const [heightValue, setHeightValue] = useState(100);

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
            uri: `data:image/png;base64,${props.foodSource.source}`,
          }}
        />
      </View>
      <View style={{ flex: 1, marginLeft: 20 }}>
        <Text>{props.foodSource.foodname}</Text>
      </View>
    </View>
  );
};

export default OneFood;
