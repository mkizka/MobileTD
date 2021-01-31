import React from "react";
import { View } from "react-native";
import { ListItem, Text } from "react-native-elements";

import { Follow } from "../../observer";
import { layoutStyles } from "./layout/styles";
import { TweetAvatar } from "./TweetAvatar";
import { TweetContent } from "./TweetContent";
import { TweetContext } from "./TweetContext";

type Props = {
  follow: Follow;
};

export const FollowItem: React.FC<Props> = ({ follow }) => {
  return (
    <ListItem containerStyle={layoutStyles.container} bottomDivider>
      <TweetContext
        type="follow"
        name={follow.user.name}
        timestamp={follow.timestamp}
      />
      <View style={layoutStyles.columns}>
        <View style={layoutStyles.leftColumn}>
          <TweetAvatar user={follow.user} />
        </View>
        <View style={layoutStyles.rightColumn}>
          <View style={layoutStyles.rightColumnHeader}>
            <View style={layoutStyles.accountLink}>
              <Text style={layoutStyles.userName}>{follow.user.name}</Text>
              <Text style={layoutStyles.textMute}>
                {follow.user.screenName}
              </Text>
            </View>
          </View>
          <TweetContent html={follow.user.description} />
        </View>
      </View>
    </ListItem>
  );
};
