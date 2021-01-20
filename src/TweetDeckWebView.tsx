import React, { useRef } from "react";
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
    <WebView
      ref={(ref) => (webviewRef.current = ref)}
      style={{ display: loggedIn ? "none" : "flex" }}
      source={{ uri: "https://tweetdeck.twitter.com" }}
      onNavigationStateChange={handleNavigationStateChange}
      onMessage={onMessage}
    />
  );
};
