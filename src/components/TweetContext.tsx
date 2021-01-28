import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";

import { RetweetUser } from "../../observer";

type Props = {
  retweetUser: RetweetUser | null;
};

export const TweetContext: React.FC<Props> = ({ retweetUser }) => {
  return retweetUser ? (
    <View style={styles.container}>
      <Icon
        containerStyle={styles.iconColumn}
        iconStyle={styles.icon}
        name="retweet"
        type="font-awesome-5"
        color="#17BF63"
      />
      <Text style={styles.textColumn}>
        {retweetUser.name}さんがリツイートしました
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 4,
  },
  iconColumn: {
    alignItems: "flex-end",
    width: 50,
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  textColumn: {
    flex: 1,
    color: "grey",
    fontSize: 12,
  },
});
