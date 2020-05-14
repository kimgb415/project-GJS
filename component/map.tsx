import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";

export default function Map({ route, navigation }) {
  const [widthValue, setWidthValue] = useState(100);
  const [heightValue, setHeightValue] = useState(100);
  const { location } = route.params;
  const { restaurant } = route.params;

  return (
    <View style={{ flex: 1, margin: 10 }}>
      <View
        onLayout={(event) => {
          setWidthValue(event.nativeEvent.layout.width);
          setHeightValue(event.nativeEvent.layout.height);
        }}
        style={styles.container}
      >
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={location}
          style={{ height: heightValue, width: widthValue }}
        >
          <Marker
            title={`${location.latitude}`}
            description={`${location.longitude}`}
            coordinate={location}
          />
          <Marker
            title={restaurant[1].name}
            description={restaurant[1].formatted_address}
            coordinate={{
              latitude: restaurant[1].geometry.location.lat,
              longitude: restaurant[1].geometry.location.lng,
            }}
          />
        </MapView>
      </View>
      <View style={{ flex: 1, margin: 20 }}>
        <Text>Restaurant</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
    flex: 3,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
