import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { ColumnSection } from "../../observer";

import { ScrollView } from "react-native";
import { Tweet } from "./Tweet";

export const Column: React.FC<{ column: ColumnSection }> = ({ column }) => {
  return (
    <ScrollView style={styles.column}>
      {column.tweets.map((tweet, i) => (
        <Tweet key={tweet.key} tweet={tweet} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  column: {
    width: Dimensions.get("window").width,
  },
});
