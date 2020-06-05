import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneFood from "../component/oneFood";
import sendHttpRequest from "../API/sendHttpRequest";

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
  const [time, setTime] = useState(0);
  const [test, setTest] = useState("fail");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time > 5) {
      setTest("true");
      sendHttpRequest("POST", "uri", {});
    }
  }, [time]);

  return (
    <View style={styles.cotainer}>
      <View style={styles.content}>
        <OneFood foodSource={route.params} />
      </View>
      <View style={styles.content}>
        <Text>{route.params.recipe}</Text>
        <Text>
          {test} + {time}
        </Text>
      </View>
    </View>
  );
}

export default Recipe;
