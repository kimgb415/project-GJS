import React, { useState, useContext, useEffect } from "react";
import { DimensionConext } from "../context/dimensionContext";
import { View, Text, Animated } from "react-native";

export default function OverlayImage() {
  const { current, imageSource } = useContext(DimensionConext);
  const dimension = new Animated.ValueXY();

  useEffect(() => {
    Animated.timing(dimension, {
      toValue: { x: 1, y: 1 },
      duration: 2000,
    }).start();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Animated.Image
        style={{
          width: dimension.x.interpolate({
            inputRange: [0, 1],
            outputRange: [current.width, 500],
          }),
          height: dimension.y.interpolate({
            inputRange: [0, 1],
            outputRange: [current.height, 600],
          }),
          transform: [{ translateY: current.y }],
        }}
        source={{
          uri: `data:image/png;base64,${imageSource}`,
        }}
      />
    </View>
  );
}
