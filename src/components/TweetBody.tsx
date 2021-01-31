import React, { useCallback, useRef, useState } from "react";
import { Modal, View } from "react-native";
import { Text } from "react-native-elements";
import ImageViewer from "react-native-image-zoom-viewer";

import { Tweet } from "../../observer";
import { layoutStyles } from "./layout/styles";
import { TweetContent } from "./TweetContent";
import { TweetMedia } from "./TweetMedia";
import { TweetFooter } from "./TweetFooter";

type Props = {
  tweet: Tweet;
};

export const TweetBody: React.FC<Props> = ({ tweet }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const imageIndex = useRef<number>(0);

  const setImageIndex = useCallback((index: number) => {
    imageIndex.current = index;
  }, []);
  const openModal = useCallback(() => setModalOpen(true), []);

  return (
    <>
      <View style={layoutStyles.rightColumnHeader}>
        <View style={layoutStyles.accountLink}>
          <Text style={layoutStyles.userName}>{tweet.user.name}</Text>
          <Text style={layoutStyles.textMute}>{tweet.user.screenName}</Text>
        </View>
        <Text style={[layoutStyles.textMute, layoutStyles.time]}>
          {tweet.timestamp.displayTime}
        </Text>
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
    </>
  );
};
