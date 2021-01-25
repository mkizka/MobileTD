import React, { MutableRefObject } from "react";
import { StyleSheet, Dimensions, ScrollView } from "react-native";
import WebView from "react-native-webview";

import { ColumnSection } from "../../observer";
import { Tweet } from "./Tweet";

type Props = {
  webviewRef: MutableRefObject<WebView | null>;
  column: ColumnSection;
};

export const Column: React.FC<Props> = ({ webviewRef, column }) => {
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
