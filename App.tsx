import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import observerCode from "./observer";

export default function App() {
  const webviewRef = useRef<WebView | null>(null);
  const handleNavigationStateChange = (e: WebViewNavigation) => {
    if (/^https:\/\/tweetdeck\.twitter\.com/.test(e.url) && !e.loading) {
      webviewRef.current!.injectJavaScript(observerCode);
    }
  };
  return (
    <View style={styles.container}>
      <WebView
        ref={(ref) => (webviewRef.current = ref)}
        source={{ uri: "https://tweetdeck.twitter.com" }}
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={(e) => console.log(e.nativeEvent)}
      />
      <StatusBar style={"auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
