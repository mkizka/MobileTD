import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { TweetDeckState } from "./observer";
import { TweetDeckWebView } from "./src/TweetDeckWebView";
import { MobileTDView } from "./src/MobileTDView";

export default function App() {
  const [deck, setDeck] = useState<TweetDeckState | null>(null);
  const loggedIn = deck != null;

  return (
    <View style={styles.container}>
      {loggedIn ? <MobileTDView deck={deck} /> : null}
      <TweetDeckWebView
        loggedIn={loggedIn}
        onMessage={(e) => setDeck(JSON.parse(e.nativeEvent.data))}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});
