import React from "react";
import { StyleSheet } from "react-native";
import HTML from "react-native-render-html";

type Props = {
  html: string;
};

const TweetContentBase: React.FC<Props> = ({ html }) => {
  return html ? (
    <HTML
      containerStyle={styles.container}
      classesStyles={{ emoji: styles.emoji, hashflag: styles.emoji }}
      source={{ html }}
    />
  ) : null;
};

export const TweetContent = React.memo(TweetContentBase, () => true);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 8,
  },
  emoji: {
    width: 16,
    height: 16,
  },
});
