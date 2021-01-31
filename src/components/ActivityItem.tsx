import React from "react";
import { Favorite, Retweet } from "../../observer";
import { ListItem, Text } from "react-native-elements";
import { layoutStyles } from "./layout/styles";
import { View } from "react-native";
import { TweetContext } from "./TweetContext";
import { TweetBody } from "./TweetBody";

type Props = {
  activity: Favorite | Retweet;
};

export const ActivityItem: React.FC<Props> = ({ activity }) => {
  return (
    <ListItem containerStyle={layoutStyles.container}>
      <TweetContext
        type={activity.type}
        name={activity.user.name}
        profileImageUrl={activity.user.profileImageUrl}
      />
      <View style={layoutStyles.columns}>
        <View style={layoutStyles.leftColumn} />
        <View style={layoutStyles.rightColumn}>
          <TweetBody tweet={activity.tweet} />
        </View>
      </View>
    </ListItem>
  );
};
