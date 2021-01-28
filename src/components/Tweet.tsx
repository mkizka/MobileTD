import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { Avatar, Text, ListItem } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";

import { TweetArticle } from "../../observer";
import { TweetContent } from "./TweetContent";
import { TweetMedia } from "./TweetMedia";
import { TweetFooter } from "./TweetFooter";
import { TweetContext } from "./TweetContext";

export const Tweet: React.FC<{ tweet: TweetArticle }> = ({ tweet }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imageIndex = useRef<number>(0);

  const setImageIndex = useCallback((index: number) => {
    imageIndex.current = index;
  }, []);
  const openModal = useCallback(() => setModalOpen(true), []);

  return (
    <ListItem containerStyle={styles.container} bottomDivider>
      <TweetContext retweetUser={tweet.retweetUser} />
      <View style={styles.columns}>
        <View style={styles.leftColumn}>
          {tweet.user.profileImageUrl ? (
            <Avatar
              rounded
              renderPlaceholderContent={<ActivityIndicator />}
              title={tweet.user.name}
              source={{ uri: tweet.user.profileImageUrl }}
            />
          ) : null}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.rightColumnHeader}>
            <View style={styles.accountLink}>
              <Text style={styles.userName}>{tweet.user.name}</Text>
              <Text style={styles.screenName}>{tweet.user.screenName}</Text>
            </View>
            <Text style={styles.time}>{tweet.displayTime}</Text>
          </View>
          <TweetContent html={tweet.text} />
          <TweetMedia
            urls={tweet.thumbnailUrls}
            setImageIndex={setImageIndex}
            openModal={openModal}
          />
          <TweetFooter
            repliesCount={tweet.repliesCount}
            retweetsCount={tweet.retweetsCount}
            favoritesCount={tweet.favoritesCount}
          />
          <Modal visible={modalOpen} transparent={true}>
            <ImageViewer
              index={imageIndex.current}
              imageUrls={tweet.thumbnailUrls.map((url) => {
                return { url };
              })}
              enableSwipeDown={true}
              onSwipeDown={() => setModalOpen(false)}
            />
          </Modal>
        </View>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  columns: {
    flexDirection: "row",
  },
  leftColumn: {
    width: 50,
  },
  rightColumn: {
    flex: 1,
  },
  rightColumnHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  accountLink: {
    flexDirection: "row",
  },
  userName: {
    fontWeight: "bold",
    marginRight: 2,
  },
  screenName: {
    color: "grey",
    fontSize: 14,
  },
  time: {
    color: "grey",
    fontSize: 12,
    marginLeft: "auto",
  },
});
