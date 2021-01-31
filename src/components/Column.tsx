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
import { TweetItem } from "./TweetItem";
import { FollowItem } from "./FollowItem";

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
      {column.items.map((item) => {
        switch (item.type) {
          case "tweet":
            return <TweetItem key={item.key} tweet={item} />;
          case "follow":
            return <FollowItem key={item.key} follow={item} />;
        }
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  column: {
    width: Dimensions.get("window").width,
  },
});
