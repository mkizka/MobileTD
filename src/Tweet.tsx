import React from "react";
import { Card, Text } from "react-native-elements";
import { TweetArticle } from "../observer";

export const Tweet: React.FC<{ tweet: TweetArticle }> = ({ tweet }) => {
  return (
    <Card>
      <Text h4>{tweet.user.name}</Text>
      <Text>{tweet.user.screenName}</Text>
      <Text>{tweet.text}</Text>
    </Card>
  );
};
