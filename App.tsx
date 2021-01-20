import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import observerCode, { TweetDeckState } from "./observer";
import { TweetDeckWebView } from "./src/TweetDeckWebView";
import { MobileTDView } from "./src/MobileTDView";
console.log(observerCode);

export default function App() {
  const [deck, setDeck] = useState<TweetDeckState | null>(null);
  return (
    <View style={styles.container}>
      <TweetDeckWebView
        loggedIn={deck != null}
        onMessage={(e) => setDeck(JSON.parse(e.nativeEvent.data))}
      />
      <MobileTDView deck={deck} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
