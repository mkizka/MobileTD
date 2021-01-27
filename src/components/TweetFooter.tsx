import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Icon } from "react-native-elements";

type Props = {
  repliesCount: string;
  retweetsCount: string;
  favoritesCount: string;
};

export const TweetFooter: React.FC<Props> = ({
  repliesCount,
  retweetsCount,
  favoritesCount,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Icon iconStyle={styles.icon} name="comment" type="font-awesome-5" />
        <Text style={styles.text}>{repliesCount}</Text>
      </View>
      <View style={styles.item}>
        <Icon iconStyle={styles.icon} name="retweet" type="font-awesome-5" />
        <Text style={styles.text}>{retweetsCount}</Text>
      </View>
      <View style={styles.item}>
        <Icon iconStyle={styles.icon} name="heart" type="font-awesome-5" />
        <Text style={styles.text}>{favoritesCount}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 3,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 16,
    color: "grey",
    marginRight: 4,
  },
  text: {
    color: "grey",
  },
});
