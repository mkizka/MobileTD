import React, { useState } from "react";
import { StyleSheet, SafeAreaView } from "react-native";

import { TweetDeckState } from "./observer";
import { TweetDeckWebView } from "./src/TweetDeckWebView";
import { MobileTDView } from "./src/MobileTDView";

export default function App() {
  const [deck, setDeck] = useState<TweetDeckState | null>(null);
  const loggedIn = deck != null;

  return (
    <SafeAreaView style={styles.container}>
      {loggedIn ? <MobileTDView deck={deck} /> : null}
      <TweetDeckWebView
        loggedIn={loggedIn}
        onMessage={(e) => setDeck(JSON.parse(e.nativeEvent.data))}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
