import React, { useState } from "react";
import { View, StyleSheet, TouchableHighlight, Modal } from "react-native";
import { Card, Text, Image } from "react-native-elements";
import HTML from "react-native-render-html";
import ImageViewer from "react-native-image-zoom-viewer";

import { TweetArticle } from "../../observer";

export const Tweet: React.FC<{ tweet: TweetArticle }> = ({ tweet }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [imageIndex, setImageIndex] = useState<number>(0);

  const ThumbnailImage: React.FC<{ index: number }> = ({ index }) => {
    const handlePress = () => {
      setImageIndex(index);
      setModalOpen(true);
    };
    return (
      <TouchableHighlight onPress={handlePress} style={{ flex: 1 }}>
        <Image
          source={{ uri: tweet.thumbnailUrls[index] }}
          containerStyle={styles.thumbnail}
        />
      </TouchableHighlight>
    );
  };

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
            <ThumbnailImage index={0} />
            {tweet.thumbnailUrls.length == 4 && (
              // 4画像時の3枚目は1列目に移動するため
              <ThumbnailImage index={2} />
            )}
          </View>
          {tweet.thumbnailUrls.length >= 2 && (
            <View style={styles.thumbnailsColumn}>
              {/* 2枚、3枚、4枚のときの画像インデックスの組み合わせ */}
              {[[1], [1, 2], [1, 3]][tweet.thumbnailUrls.length - 2].map(
                (index) => (
                  <ThumbnailImage key={index} index={index} />
                )
              )}
            </View>
          )}
        </View>
      )}
      {modalOpen && (
        <Modal visible={true} transparent={true}>
          <ImageViewer
            index={imageIndex}
            imageUrls={tweet.thumbnailUrls.map((url) => {
              return { url };
            })}
            enableSwipeDown={true}
            onSwipeDown={() => setModalOpen(false)}
          />
        </Modal>
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
