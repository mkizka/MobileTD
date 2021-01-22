import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { Card, Text, Image } from "react-native-elements";
import HTML from "react-native-render-html";
import Lightbox from "react-native-lightbox";

import { TweetArticle } from "../../observer";

export const Tweet: React.FC<{ tweet: TweetArticle }> = ({ tweet }) => {
  return (
    <Card>
      <Text h4>{tweet.user.name}</Text>
      <Text>{tweet.user.screenName}</Text>
      {tweet.text ? (
        <HTML
          containerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
          classesStyles={{ emoji: { width: 16, height: 16 } }}
          source={{ html: tweet.text }}
        />
      ) : null}
      {tweet.thumbnailUrls.length > 0 ? (
        <FlatList
          style={styles.mediaContainer}
          data={tweet.thumbnailUrls}
          numColumns={2}
          columnWrapperStyle={{ width: "50%", height: "50%" }}
          renderItem={({ item, index }) => (
            <Lightbox key={index}>
              <Image
                source={{ uri: item }}
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </Lightbox>
          )}
        />
      ) : null}
    </Card>
  );
};

const styles = StyleSheet.create({
  mediaContainer: {
    height: 130,
  },
});
