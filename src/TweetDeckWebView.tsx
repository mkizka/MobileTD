import React, { useRef } from "react";
import { View, StyleSheet } from "react-native";
import {
  WebView,
  WebViewNavigation,
  WebViewMessageEvent,
} from "react-native-webview";
import observerCode from "../observer";

type Props = {
  loggedIn: boolean;
  onMessage?: (event: WebViewMessageEvent) => void;
};

export const TweetDeckWebView: React.FC<Props> = ({ loggedIn, onMessage }) => {
  const webviewRef = useRef<WebView | null>(null);

  const handleNavigationStateChange = (e: WebViewNavigation) => {
    if (/^https:\/\/tweetdeck\.twitter\.com/.test(e.url) && !e.loading) {
      webviewRef.current!.injectJavaScript(observerCode);
    }
  };
  return (
    <View style={loggedIn ? styles.hidden : {}}>
      <WebView
        ref={(ref) => (webviewRef.current = ref)}
        source={{ uri: "https://tweetdeck.twitter.com" }}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={onMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
});
