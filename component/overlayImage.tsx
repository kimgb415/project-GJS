import React, { useState, useContext, useEffect } from "react";
import { DimensionConext } from "../context/dimensionContext";
import { View, Image, Animated } from "react-native";
import pasta from "../assets/pasta.jpg";

export default function OverlayImage() {
  const { imageSource } = useContext(DimensionConext);
  const dimension = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(dimension, { toValue: 1, duration: 2000 }).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        style={{
          transform: [
            {
              scale: dimension.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
              }),
            },
          ],
          resizeMode: "cover",
          width: 100,
          height: 100,
        }}
        source={{
          uri: `data:image/png;base64,${imageSource}`,
        }}
      />
    </View>
  );
}
