import React from "react";
import { View } from "react-native";
import { ListItem } from "react-native-elements";

import { Tweet } from "../../observer";
import { TweetContext } from "./TweetContext";
import { TweetAvatar } from "./TweetAvatar";
import { layoutStyles } from "./layout/styles";
import { TweetBody } from "./TweetBody";

export const TweetItem: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  return (
    <ListItem containerStyle={layoutStyles.container} bottomDivider>
      <TweetContext type="retweet" name={tweet.retweetUser?.name} />
      <View style={layoutStyles.columns}>
        <View style={layoutStyles.leftColumn}>
          <TweetAvatar
            name={tweet.user.name}
            uri={tweet.user.profileImageUrl}
          />
        </View>
        <View style={layoutStyles.rightColumn}>
          <TweetBody tweet={tweet} />
        </View>
      </View>
    </ListItem>
  );
};
