import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import OneFood from "../component/oneFood";
import sendHttpRequest from "../API/sendHttpRequest";
import { UserId } from "../context/UserId";
import { Duration } from "../context/howLong";
import { Case } from "../context/caseContext";

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
  const { mode } = useContext(Case);
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
          mode: mode,
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
        <Text>
          {test} + {time}
        </Text>
        <ScrollView style={{ flex: 1, margin: 10 }}>
          <Text>{route.params.recipe}</Text>
        </ScrollView>
      </View>
    </View>
  );
}

export default Recipe;
