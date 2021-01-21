import React from "react";
import { View, ScrollView, Dimensions, StyleSheet } from "react-native";
import { Column } from "./components/Column";
import { TweetDeckState } from "../observer";

type Props = {
  deck: TweetDeckState | null;
};

export const MobileTDView: React.FC<Props> = ({ deck }) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      pagingEnabled={true}
    >
      {deck?.columns.map((column, i) => (
        <View key={i} style={styles.column}>
          <Column column={column} />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  column: {
    width: Dimensions.get("window").width,
  },
});
