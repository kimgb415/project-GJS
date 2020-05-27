import React, { useState } from "react";
import { View, StyleSheet, Animated, PanResponder } from "react-native";

const Recommend = () => {
  const colors = ["#5C6BC0", "#009688", "#F44336"];
  const [cardsStacked, setCardsStacked] = useState(new Animated.Value(0));
  const [cardsPan, setCardsPan] = useState(new Animated.ValueXY());
  const [currentIndex, setCurrentIndex] = useState(0);

  const cardsPanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (event, gestureState) => {
      cardsPan.setValue({ x: gestureState.dx, y: gestureState.dy });
    },
    onPanResponderTerminationRequest: () => false,
    onPanResponderRelease: (event, gestureState) => {
      Animated.timing(cardsPan, {
        toValue: 0,
        duration: 300,
      }).start();
      Animated.timing(cardsStacked, {
        toValue: 1,
        duration: 300,
      }).start(() => {
        cardsStacked.setValue(0);
        setCurrentIndex(currentIndex + 1);
      });
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View // last card
        style={{
          width: 300,
          height: 150,
          position: "absolute",
          backgroundColor: colors[(currentIndex + 2) % 3],
          zIndex: 1,
          bottom: cardsStacked.interpolate({
            inputRange: [0, 1],
            outputRange: [40, 20],
          }),
          transform: [
            {
              scale: cardsStacked.interpolate({
                inputRange: [0, 1],
                outputRange: [0.8, 0.9],
              }),
            },
          ],
          opacity: cardsStacked.interpolate({
            inputRange: [0, 1],
            outputRange: [0.3, 0.6],
          }),
        }}
      />
      <Animated.View // second card
        style={{
          width: 300,
          height: 150,
          position: "absolute",
          backgroundColor: colors[(currentIndex + 1) % 3],
          zIndex: 2,
          bottom: cardsStacked.interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          }),
          transform: [
            {
              scale: cardsStacked.interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, 1.0],
              }),
            },
          ],
          opacity: cardsStacked.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1],
          }),
        }}
      />
      <Animated.View // frontmost card
        {...cardsPanResponder.panHandlers}
        style={{
          width: 300,
          height: 150,
          position: "absolute",
          backgroundColor: colors[currentIndex % 3],
          zIndex: cardsStacked.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [3, 2, 0],
          }),
          bottom: cardsStacked.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 40],
          }),
          opacity: cardsStacked.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0.3],
          }),
          transform: [
            { translateX: cardsPan.x },
            {
              scale: cardsStacked.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.8],
              }),
            },
          ],
        }}
      />
    </View>
  );
};

export default Recommend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
