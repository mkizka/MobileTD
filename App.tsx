import React, { useRef, useState } from "react";
import { StyleSheet, SafeAreaView, Platform, StatusBar } from "react-native";
import WebView, { WebViewMessageEvent } from "react-native-webview";
import { useThrottle } from "@react-hook/throttle";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import AppLoading from "expo-app-loading";
import { loadAsync as loadFontAsync } from "expo-font";
import { FontAwesome5 } from "@expo/vector-icons";

import { TweetDeckState, WebViewMessageData } from "./observer";
import { TweetDeckWebView } from "./src/TweetDeckWebView";
import { MobileTDView } from "./src/MobileTDView";

export default function App() {
  const [ready, setReady] = useState<boolean>(false);
  const [deck, setDeck] = useThrottle<TweetDeckState | null>(null, 0.5);
  const loggedIn = deck != null;
  const webviewRef = useRef<WebView | null>(null);

  const handleStartAsync = async () => {
    await loadFontAsync(FontAwesome5.font);
  };

  if (!ready) {
    return (
      <AppLoading
        startAsync={handleStartAsync}
        onFinish={() => setReady(true)}
        onError={console.warn}
      />
    );
  }

  const handleMessage = (event: WebViewMessageEvent) => {
    const webviewMessage: WebViewMessageData = JSON.parse(
      event.nativeEvent.data
    );
    switch (webviewMessage.type) {
      case "state":
        setDeck(webviewMessage.data);
        break;
      case "debug":
        console.debug("[webviewMessage]", webviewMessage.data);
        break;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {loggedIn ? <MobileTDView webviewRef={webviewRef} deck={deck} /> : null}
      <TweetDeckWebView
        webviewRef={webviewRef}
        loggedIn={loggedIn}
        onMessage={handleMessage}
      />
      <ExpoStatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    // https://qiita.com/jigengineer/items/00bbfa10defc0c2f2fad
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
