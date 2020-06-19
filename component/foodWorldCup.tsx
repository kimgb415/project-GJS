import React, { useState, useContext } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    margin: 10,
  },
});

export default function foodWorldCup(props) {
  const [widthValue, setWidthValue] = useState(100);
  const [heightValue, setHeightValue] = useState(100);

  return (
    <View
      onLayout={(event) => {
        setWidthValue(event.nativeEvent.layout.width);
        setHeightValue(event.nativeEvent.layout.height);
      }}
      style={styles.container}
    >
      <TouchableOpacity disabled={true} style={{ flex: 1 }}>
        <Image
          style={{ width: widthValue, height: heightValue }}
          resizeMethod="resize"
          source={{
            uri: `data:image/png;base64,${props.foodSource.source}`,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}
