import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Text } from "react-native-elements";
import { Timestamp } from "../../observer";
import { layoutStyles } from "./layout/styles";

type Props = {
  type: "retweet" | "follow";
  name?: string;
  timestamp?: Timestamp;
};

export const TweetContext: React.FC<Props> = ({ type, name, timestamp }) => {
  type Context = {
    iconName: string;
    color: string;
    text: string;
  };
  const contexts: Record<typeof type, Context> = {
    retweet: {
      iconName: "retweet",
      color: "green",
      text: "さんがリツイートしました",
    },
    follow: {
      iconName: "user",
      color: "blue",
      text: "さんがフォローしました",
    },
  };
  return name ? (
    <View style={styles.container}>
      <Icon
        containerStyle={styles.iconColumn}
        iconStyle={styles.icon}
        name={contexts[type].iconName}
        type="font-awesome-5"
        color={contexts[type].color}
        solid
      />
      <Text style={styles.textColumn}>
        {name}
        {contexts[type].text}
      </Text>
      {timestamp ? (
        <Text style={[layoutStyles.textMute, layoutStyles.time]}>
          {timestamp.displayTime}
        </Text>
      ) : null}
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
