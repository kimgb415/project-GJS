import React, { useState, useEffect, useContext, useCallback } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import sendHttpRequest from "../API/sendHttpRequest";
import { UserId } from "../context/UserId";
import { Case } from "../context/caseContext";

export default function Login({ navigation }) {
  const { mode } = useContext(Case);
  const { user, submitUserId } = useContext(UserId);
  const [canNotSubmit, setCanNotSubmit] = useState(false);

  const submitHandler = async () => {
    await sendHttpRequest(
      "POST",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/06-05-demo/user/basic/id",
      { mode: mode, id: user }
    ).then((res) => {
      if (res.statusCode == 200) {
        navigation.navigate("BasicInfo");
      } else {
        navigation.navigate("FoodRecommend");
      }
    });
  };

  useEffect(() => {
    sendHttpRequest(
      "POST",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/06-05-demo/user/basic/id",
      { mode: mode, id: user }
    ).then((res) => {
      if (res.errorType === "ValueError") setCanNotSubmit(true);
      else if (res.statusCode == 200) {
        setCanNotSubmit(false);
      }
    });
  }, [user]);

  return (
    <View style={styles.screen}>
      <View style={styles.infoContainer}>
        <Text>Id</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(user) => submitUserId(user)}
          value={user}
        />
      </View>
      <View style={styles.submitButton}>
        <Button
          title="Submit"
          disabled={canNotSubmit}
          onPress={submitHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    margin: 20,
    padding: 10,
  },

  infoContainer: {
    flex: 1,
    paddingTop: 40,
  },

  submitButton: {
    height: 40,
    width: 80,
    flexDirection: "row-reverse",
    margin: 20,
  },
});
