import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet, Modal, ActivityIndicator } from "react-native";
import { Avatar, Text, ListItem } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";

import { TweetArticle } from "../../observer";
import { TweetContent } from "./TweetContent";
import { TweetMedia } from "./TweetMedia";

export const Tweet: React.FC<{ tweet: TweetArticle }> = ({ tweet }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imageIndex = useRef<number>(0);

  const setImageIndex = useCallback((index: number) => {
    imageIndex.current = index;
  }, []);
  const openModal = useCallback(() => setModalOpen(true), []);

  return (
    <ListItem bottomDivider>
      <View style={styles.inner}>
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
            <Text style={styles.userName}>{tweet.user.name}</Text>
            <Text style={styles.screenName}>{tweet.user.screenName}</Text>
          </View>
          <TweetContent html={tweet.text} />
          <TweetMedia
            urls={tweet.thumbnailUrls}
            setImageIndex={setImageIndex}
            openModal={openModal}
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
  inner: {
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
  },
  userName: {
    fontWeight: "bold",
  },
  screenName: {
    color: "grey",
    fontSize: 10,
  },
});
