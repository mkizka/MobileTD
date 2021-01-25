import React, { MutableRefObject } from "react";
import { View, StyleSheet } from "react-native";
import {
  WebView,
  WebViewNavigation,
  WebViewMessageEvent,
} from "react-native-webview";
import observerCode from "../observer";

type Props = {
  webviewRef: MutableRefObject<WebView | null>;
  loggedIn: boolean;
  onMessage?: (event: WebViewMessageEvent) => void;
};

export const TweetDeckWebView: React.FC<Props> = ({
  webviewRef,
  loggedIn,
  onMessage,
}) => {
  const handleNavigationStateChange = (e: WebViewNavigation) => {
    if (/^https:\/\/tweetdeck\.twitter\.com/.test(e.url) && !e.loading) {
      webviewRef.current!.injectJavaScript(observerCode);
    }
  };
  return (
    <View style={{ flex: loggedIn ? 0 : 1 }}>
      <WebView
        ref={(ref) => (webviewRef.current = ref)}
        source={{ uri: "https://tweetdeck.twitter.com" }}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={onMessage}
      />
    </View>
  );
};
