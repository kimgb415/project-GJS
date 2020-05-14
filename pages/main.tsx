import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import Graph from "../component/graph";
import TimeLine from "../component/timeLine";
import Badge from "../component/badge";

const styles = StyleSheet.create({
  container: {
    flex: 3,
    margin: 20,
  },

  badgeContanier: {
    flexDirection: "row",
    flex: 1,
    margin: 5,
    alignContent: "center",
    justifyContent: "space-around",
  },

  content: {
    flex: 4,
    marginVertical: 20,
  },

  button: {
    flex: 1,
    padding: 10,
    marginTop: 50,
    alignItems: "flex-end",
  },
});

function Main({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Graph />
      </View>
      <View style={styles.container}>
        <View style={styles.badgeContanier}>
          <Badge />
          <Badge />
          <Badge />
          <Badge />
        </View>
        <View style={styles.badgeContanier}>
          <Badge />
          <Badge />
          <Badge />
          <Badge />
        </View>
      </View>
      <View style={styles.content}>
        <TimeLine />
      </View>
      <View style={styles.button}>
        <Button
          title="Recommend"
          onPress={() => navigation.navigate("FoodRecommend")}
        />
      </View>
    </View>
  );
}

export default Main;
