import React, { useState, useRef, useCallback } from "react";
import { View, StyleSheet, Modal } from "react-native";
import { Text, ListItem } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";

import { Tweet } from "../../observer";
import { TweetContent } from "./TweetContent";
import { TweetMedia } from "./TweetMedia";
import { TweetFooter } from "./TweetFooter";
import { TweetContext } from "./TweetContext";
import { TweetAvatar } from "./TweetAvatar";
import { layoutStyles } from "./layout/styles";

export const TweetItem: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imageIndex = useRef<number>(0);

  const setImageIndex = useCallback((index: number) => {
    imageIndex.current = index;
  }, []);
  const openModal = useCallback(() => setModalOpen(true), []);

  return (
    <ListItem containerStyle={layoutStyles.container} bottomDivider>
      <TweetContext retweetUser={tweet.retweetUser} />
      <View style={layoutStyles.columns}>
        <View style={layoutStyles.leftColumn}>
          <TweetAvatar user={tweet.user} />
        </View>
        <View style={layoutStyles.rightColumn}>
          <View style={styles.rightColumnHeader}>
            <View style={styles.accountLink}>
              <Text style={styles.userName}>{tweet.user.name}</Text>
              <Text style={styles.screenName}>{tweet.user.screenName}</Text>
            </View>
            <Text style={styles.time}>{tweet.timestamp.displayTime}</Text>
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
          <Modal
            visible={modalOpen}
            transparent={true}
            onRequestClose={() => setModalOpen(false)}
          >
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
