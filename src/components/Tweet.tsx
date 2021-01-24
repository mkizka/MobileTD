import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Image } from "react-native-elements";
import HTML from "react-native-render-html";

import { TweetArticle } from "../../observer";

export const Tweet: React.FC<{ tweet: TweetArticle }> = ({ tweet }) => {
  return (
    <Card>
      <Text h4>{tweet.user.name}</Text>
      <Text>{tweet.user.screenName}</Text>
      {tweet.text ? (
        <HTML
          containerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          classesStyles={{ emoji: styles.emoji, hashflag: styles.emoji }}
          source={{ html: tweet.text }}
        />
      ) : null}
      {tweet.thumbnailUrls.length >= 1 ? (
        <View style={styles.thumbnailsContainer}>
          <View
            style={{
              flexDirection: "row",
              flex: 1,
              marginBottom: 2
            }}
          >
            <Image
              source={{ uri: tweet.thumbnailUrls[0] }}
              containerStyle={{
                flex: 1,
                marginRight: 1,
              }}
              resizeMode="cover"
            />
            {tweet.thumbnailUrls.length >= 2 && (
              <Image
                source={{ uri: tweet.thumbnailUrls[1] }}
                containerStyle={{
                  flex: 1,
                  marginLeft: 1,
                }}
                resizeMode="cover"
              />
            )}
          </View>
          <View
            style={{
              flexDirection: "row",
              flex: tweet.thumbnailUrls.length >= 3 ? 1 : 0,
            }}
          >
            {tweet.thumbnailUrls.length >= 3 && (
              <Image
                source={{ uri: tweet.thumbnailUrls[2] }}
                containerStyle={{ flex: 1, marginRight: 1 }}
                resizeMode="cover"
              />
            )}
            {tweet.thumbnailUrls.length > 3 && (
              <Image
                source={{ uri: tweet.thumbnailUrls[3] }}
                containerStyle={{ flex: 1, marginLeft: 1 }}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  thumbnailsContainer: {
    height: 130,
    width: "100%",
  },
  emoji: {
    width: 16,
    height: 16,
  },
});
