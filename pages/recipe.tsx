import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import OneFood from "../component/oneFood";
import sendHttpRequest from "../API/sendHttpRequest";
import { UserId } from "../context/UserId";
import { Duration } from "../context/howLong";

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
  const { user } = useContext(UserId);
  const { foodId } = useContext(Duration);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (time == 10) {
      setTest("true");
      let eventTime = new Date();
      sendHttpRequest(
        "POST",
        "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/06-05-demo/user/event",
        {
          eventName: "10s",
          time: eventTime,
          user: user,
          foodId: foodId,
        }
      );
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
