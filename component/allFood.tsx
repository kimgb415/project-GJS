import React, { useState, useEffect } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import OneFood from "./oneFood";

const AllFood = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(item, index) => item.key}
        data={props.allInfo}
        renderItem={(food) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              let time = new Date().getTime();
              props.navigation.navigate("OnlyOneFood", food.item);
            }}
          >
            <OneFood key={food.item.key} foodSource={food.item} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default AllFood;
