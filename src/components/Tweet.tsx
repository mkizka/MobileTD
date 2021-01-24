import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Image } from "react-native-elements";
import HTML from "react-native-render-html";

import { TweetArticle } from "../../observer";

const ThumbnailImage: React.FC<{ uri: string }> = ({ uri }) => {
  return <Image source={{ uri }} containerStyle={styles.thumbnail} />;
};

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
      {tweet.thumbnailUrls.length >= 1 && (
        <View style={styles.thumbnailsContainer}>
          <View style={styles.thumbnailsColumn}>
            <ThumbnailImage uri={tweet.thumbnailUrls[0]} />
            {tweet.thumbnailUrls.length == 4 && (
              // 4画像時の3枚目は1列目に移動するため
              <ThumbnailImage uri={tweet.thumbnailUrls[2]} />
            )}
          </View>
          {tweet.thumbnailUrls.length >= 2 && (
            <View style={styles.thumbnailsColumn}>
              {tweet.thumbnailUrls.slice(1).map((uri, i) => {
                // i == (2,3,4枚目)の1
                const shouldShow = !(tweet.thumbnailUrls.length == 4 && i == 1);
                return shouldShow && <ThumbnailImage key={uri} uri={uri} />;
              })}
            </View>
          )}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  thumbnailsContainer: {
    height: 130,
    width: "100%",
    flexDirection: "row",
  },
  thumbnailsColumn: {
    flex: 1,
  },
  thumbnail: {
    flex: 1,
    resizeMode: "cover",
  },
  emoji: {
    width: 16,
    height: 16,
  },
});
