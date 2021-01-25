import React, { useRef } from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import { useThrottle } from "@react-hook/throttle";
import WebView from "react-native-webview";

import { TweetDeckState } from "./observer";
import { TweetDeckWebView } from "./src/TweetDeckWebView";
import { MobileTDView } from "./src/MobileTDView";

export default function App() {
  const [deck, setDeck] = useThrottle<TweetDeckState | null>(null, 0.5);
  const loggedIn = deck != null;
  const webviewRef = useRef<WebView | null>(null);

  return (
    <SafeAreaView style={styles.container}>
      {loggedIn ? <MobileTDView webviewRef={webviewRef} deck={deck} /> : null}
      <TweetDeckWebView
        webviewRef={webviewRef}
        loggedIn={loggedIn}
        onMessage={(e) => setDeck(JSON.parse(e.nativeEvent.data))}
      />
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // https://qiita.com/jigengineer/items/00bbfa10defc0c2f2fad
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
