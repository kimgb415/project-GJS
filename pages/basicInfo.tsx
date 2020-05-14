import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  Button,
} from "react-native";
import sendHttpRequest from "../API/sendHttpRequest";
import { UserId } from "../context/UserId";

export default function BasicInfo({ navigation }) {
  const [selectedSexValue, setSelectedSexValue] = useState("Male");
  const [ageValue, setAgeText] = useState(null);
  const [heightValue, setHeightText] = useState(null);
  const [weightValue, setWeightText] = useState(null);
  const [buttonClickable, setButtonClickable] = useState(true);
  const [fullInfo, setFullInfo] = useState({});
  const { user } = useContext(UserId);

  useEffect(() => {
    if (!(ageValue === null || heightValue === null || weightValue === null)) {
      setButtonClickable(false);
      setFullInfo({
        id: user,
        age: ageValue,
        gender: selectedSexValue === "Male",
        height: heightValue,
        weight: weightValue,
      });
    }
  }, [ageValue, heightValue, weightValue]);

  return (
    <View style={styles.screen}>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedSexValue}
          style={{ height: 50, width: 150 }}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedSexValue(itemValue)
          }
        >
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>
      <View style={styles.infoContainer}>
        <Text>Age</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setAgeText(text)}
          value={ageValue}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text>Height</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setHeightText(text)}
          value={heightValue}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text>Weight</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setWeightText(text)}
          value={weightValue}
        />
      </View>
      <View style={styles.submitButton}>
        <Button
          title="Submit"
          // disabled={buttonClickable}
          onPress={() => {
            sendHttpRequest(
              "POST",
              "https://nqnjwccsg0.execute-api.ap-northeast-2.amazonaws.com/beta_0510/user/basic/info",
              fullInfo
            );
            navigation.navigate("FoodSelect");
          }}
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

  pickerContainer: {
    flex: 2,
  },

  infoContainer: {
    flex: 1,
    paddingTop: 40,
  },

  submitButton: {
    flex: 4,
    flexDirection: "row-reverse",
    margin: 20,
  },
});
