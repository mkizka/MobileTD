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
      {deck?.columns.map((column) => (
        <Column key={column.columnId} column={column} />
      ))}
    </ScrollView>
  );
};
