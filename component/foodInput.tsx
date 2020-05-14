import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  ShadowPropTypesIOS,
} from "react-native";

function FoodInput(props) {
  const [enteredFood, setEnteredFood] = useState("");

  const foodInputHandler = (enteredFood) => {
    setEnteredFood(enteredFood);
  };

  return (
    <View>
      <TextInput
        placeholder="Food"
        style={styles.foodInput}
        onChangeText={foodInputHandler}
        value={enteredFood}
      />
      <Button title="Add" onPress={() => props.onAddFood(enteredFood)} />
    </View>
  );
}

const styles = StyleSheet.create({
  foodInput: {
    width: "80%",
    borderWidth: 1,
    padding: 10,
  },
});

export default FoodInput;
