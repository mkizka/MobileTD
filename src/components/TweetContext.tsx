import React from "react";
import { StyleSheet, View } from "react-native";
import { Icon, Image, Text } from "react-native-elements";
import { Timestamp } from "../../observer";
import { layoutStyles } from "./layout/styles";
import { TweetAvatar } from "./TweetAvatar";

type Props = {
  type: "retweet" | "favorite" | "follow";
  name?: string;
  profileImageUrl?: string;
  timestamp?: Timestamp;
};

export const TweetContext: React.FC<Props> = ({
  type,
  name,
  profileImageUrl,
  timestamp,
}) => {
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
    favorite: {
      iconName: "heart",
      color: "red",
      text: "さんがいいねしました",
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
      <TweetAvatar name={name} size={24} uri={profileImageUrl} />
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
    alignItems: "center",
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
