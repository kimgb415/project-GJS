import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

function FoodItem(props) {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.foodItem}>
        <Text>{props.title}</Text>
      </View>
      <View style={styles.button}>
        <Button title="Delete" onPress={props.onDelete.bind(this, props.id)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  foodItem: {
    flex: 3,
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },

  button: {
    flex: 1,
  },
});

export default FoodItem;
