import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneFood from "../component/oneFood";

const styles = StyleSheet.create({
  cotainer: {
    flex: 1,
    margin: 20,
    justifyContent: "flex-start",
    alignContent: "center",
  },

  content: {
    flex: 1,
    padding: 10,
    margin: 10,
  },
});

function Recipe({ route }) {
  return (
    <View style={styles.cotainer}>
      <View style={styles.content}>
        <OneFood foodSource={route.params} />
      </View>
      <View style={styles.content}>
        <Text>{route.params.recipe}</Text>
      </View>
    </View>
  );
}

export default Recipe;
