import React from "react";
import { View } from "react-native";
import { BarChart, Grid, YAxis } from "react-native-svg-charts";

export default function Graph() {
  const fill = "rgb(134, 65, 244)";
  const data = [50, 10, 40, 95, -4, -24, 85, 0, 35];
  const contentInset = { top: 20, bottom: 20 };

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <YAxis
        data={data}
        contentInset={contentInset}
        svg={{
          fill: "grey",
          fontSize: 10,
        }}
        numberOfTicks={10}
        formatLabel={(value) => `${value}`}
      />
      <BarChart
        style={{ flex: 1 }}
        data={data}
        svg={{ fill }}
        contentInset={contentInset}
      >
        <Grid />
      </BarChart>
    </View>
  );
}
