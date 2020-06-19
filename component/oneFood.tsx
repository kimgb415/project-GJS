import React, { useState } from "react";
import { Image, View, Text } from "react-native";

const OneFood = ({ foodSource }) => {
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
          resizeMethod="resize"
          source={{
            uri: `data:image/png;base64,${foodSource.source}`,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          marginLeft: 20,
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Text>{foodSource.foodname}</Text>
        {foodSource.num <= 4 ? (
          <Text>Recommended by AI</Text>
        ) : foodSource.num == 5 ? (
          <Text>most popular food</Text>
        ) : (
          <Text>New Food</Text>
        )}
      </View>
    </View>
  );
};

export default OneFood;
