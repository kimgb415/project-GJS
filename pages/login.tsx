import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, TextInput, View, Button } from "react-native";
import sendHttpRequest from "../API/sendHttpRequest";
import { UserId } from "../context/UserId";

export default function Login({ navigation }) {
  const { user, submitUserId } = useContext(UserId);
  const [whatIsNext, setWhatIsNext] = useState("BasicInfo");
  const [canSubmit, setCanSubmit] = useState(false);

  const submitHandler = async () => {
    await sendHttpRequest(
      "POST",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_0510/user/basic/id",
      { id: user }
    ).then((res) => {
      if (res.errorType === "ValueError") setCanSubmit(true);
      else {
        setCanSubmit(false);
        let value = res.statusCode == 200 ? "BasicInfo" : "Main";
        setWhatIsNext(value);
      }
    });
    // navigation.navigate(whatIsNext);
    navigation.navigate("FoodRecommend");
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    sendHttpRequest(
      "POST",
      "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_0510/user/basic/id",
      { id: user }
    ).then((res) => {
      if (res.errorType === "ValueError") setCanSubmit(true);
      else {
        setCanSubmit(false);
        let value = res.statusCode == 200 ? "BasicInfo" : "Main";
        setWhatIsNext(value);
      }
    });
  }, [user]);
  ///////////////////////////////////////////////////////////////////////////////////////////////////

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
        <Button title="Submit" disabled={canSubmit} onPress={submitHandler} />
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
    flex: 2,
    flexDirection: "row-reverse",
    margin: 20,
  },
});
