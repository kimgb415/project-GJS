import React, { useState, useContext, useEffect } from "react";
import { DimensionConext } from "../context/dimensionContext";
import { View, Text, Animated } from "react-native";

export default function OverlayImage() {
  const { current, imageSource } = useContext(DimensionConext);
  const dimension = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(dimension, { toValue: 1, duration: 2000 }).start();
  }, []);

  return (
    
    <View style={{ width: current.width, height: current.height, backgroundColor:"tomato" }}>
      {/* <Animated.Image
        style={{
          flex: 1,
          transform: [
            {
              scale: dimension.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 2],
              },
              ),
            },
          ],
          
        }}
        source={{
          uri: `data:image/png;base64,${imageSource}`,
        }}
      /> */}
    <Text style={{fontSize: 200}}>{current.key}</Text>
    </View>
  );
}
