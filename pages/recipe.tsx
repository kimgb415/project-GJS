import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneFood from "../component/oneFood";

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    margin: 20,
    justifyContent: "flex-start",
  },

  content: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
});

function Recipe() {
  const [recipeString, setRecipeString] = useState("fail to load recipe");

  useEffect(() => {
    fetch(
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_2020_04_28/user/basic"
    )
      .then((response) => response.json())
      .then((json) => setRecipeString(json[1]["gender"]))
      .catch((error) => console.error(error));
  }, []);

  return (
    <View style={styles.cotainer}>
      <View style={styles.content}>
        <OneFood />
      </View>
      <View style={styles.content}>
        <Text>{recipeString}</Text>
      </View>
    </View>
  );
}

export default Recipe;
