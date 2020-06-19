import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { Case } from "../context/caseContext";

export default function Demo({ navigation }) {
  const { modeUpdate } = useContext(Case);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <View style={{ height: 40, width: 80 }}>
        <Button
          title="case0"
          onPress={() => {
            modeUpdate(0);
            navigation.navigate("Login");
          }}
        />
      </View>
      <View style={{ height: 40, width: 80 }}>
        <Button
          title="case1"
          onPress={() => {
            modeUpdate(1);
            navigation.navigate("Login");
          }}
        />
      </View>
    </View>
  );
}
