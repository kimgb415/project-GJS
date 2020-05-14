import React from "react";
import { View, Slider, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default function RatingSlider(props) {
  return (
    <View style={styles.screen}>
      <Slider
        maximumValue={6}
        minimumValue={0}
        value={3}
        step={1}
        disabled={props.sliderSetting}
        onSlidingComplete={(value) => props.onSlidingComplete(value)}
      />
    </View>
  );
}
