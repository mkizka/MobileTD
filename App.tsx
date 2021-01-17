import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from "react-native"
import { WebView } from 'react-native-webview';

export default function App() {
  return (
    <View style={styles.container} >
      <WebView
        source={{ uri: 'https://tweetdeck.twitter.com'}}
        injectedJavaScript={`
          setTimeout(() => {
            window.ReactNativeWebView.postMessage(document.title)
          }, 2000)
        `}
        onMessage={e => console.log(e.nativeEvent)}
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
