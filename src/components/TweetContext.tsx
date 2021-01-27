import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import React from "react";
import { RetweetUser } from "../../observer/src/types";

type Props = {
  retweetUser: RetweetUser | null;
};

export const TweetContext: React.FC<Props> = ({ retweetUser }) => {
  return retweetUser ? (
    <View style={styles.container}>
      <Icon
        iconStyle={styles.icon}
        name="retweet"
        type="font-awesome-5"
        color="#17BF63"
      />
      <Text style={styles.userName}>
        {retweetUser.name}さんがリツイートしました
      </Text>
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  icon: {
    fontSize: 16,
    marginRight: 8,
  },
  userName: {
    color: "grey",
    fontSize: 12,
  },
});
