import React, { MutableRefObject } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import WebView from "react-native-webview";

import { ColumnSection } from "../../observer";
import { Tweet } from "./Tweet";

type Props = {
  webviewRef: MutableRefObject<WebView | null>;
  column: ColumnSection;
};

export const Column: React.FC<Props> = ({ webviewRef, column }) => {
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const scrollHeight = layoutMeasurement.height + contentOffset.y;
    if (scrollHeight >= contentSize.height - 200) {
      console.log("bottom", new Date());
      webviewRef.current!.injectJavaScript(
        `MTD.requestScrollToBottom("${column.id}")`
      );
    }
  };
  return (
    <ScrollView style={styles.column} onScrollEndDrag={handleScroll}>
      {column.tweets.map((tweet) => (
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
