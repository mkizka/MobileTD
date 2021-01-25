import React from "react";
import { StyleSheet, View } from "react-native";
import { useThrottle } from "@react-hook/throttle";

import { TweetDeckState } from "./observer";
import { TweetDeckWebView } from "./src/TweetDeckWebView";
import { MobileTDView } from "./src/MobileTDView";

export default function App() {
  const [deck, setDeck] = useThrottle<TweetDeckState | null>(null, 0.5);
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
