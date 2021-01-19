import React, { useRef, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, ScrollView } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import observerCode, { TweetDeckState } from "./observer";
import { Tweet } from "./src/Tweet";
console.log(observerCode);

export default function App() {
  const [deck, setDeck] = useState<TweetDeckState | null>(null);
  const webviewRef = useRef<WebView | null>(null);
  const injected = useRef<boolean>(false);

  const handleNavigationStateChange = (e: WebViewNavigation) => {
    if (
      !injected.current &&
      /^https:\/\/tweetdeck\.twitter\.com/.test(e.url) &&
      !e.loading
    ) {
      webviewRef.current!.injectJavaScript(observerCode);
      injected.current = true;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <WebView
          ref={(ref) => (webviewRef.current = ref)}
          style={{ display: deck == null ? "flex" : "none" }}
          source={{ uri: "https://tweetdeck.twitter.com" }}
          onNavigationStateChange={handleNavigationStateChange}
          onMessage={(e) => setDeck(JSON.parse(e.nativeEvent.data))}
        />
        {deck?.columns[0].tweets.map((tweet, i) => (
          <Tweet key={i} tweet={tweet} />
        ))}
      </ScrollView>
      <StatusBar style={"auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
