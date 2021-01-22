import React from "react";
import { View } from "react-native";
import { Card, Text } from "react-native-elements";
import HTML from "react-native-render-html";

import { TweetArticle } from "../../observer";

export const Tweet: React.FC<{ tweet: TweetArticle }> = ({ tweet }) => {
  return (
    <Card>
      <Text h4>{tweet.user.name}</Text>
      <Text>{tweet.user.screenName}</Text>
      <HTML
        containerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
        classesStyles={{ emoji: { width: 16, height: 16 } }}
        source={{ html: tweet.text }}
      />
    </Card>
  );
};
