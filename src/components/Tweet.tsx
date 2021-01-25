import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Avatar, Text, Image, ListItem, Card } from "react-native-elements";
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
          containerStyle={styles.thumbnailItem}
        />
      </TouchableHighlight>
    );
  };

  return (
    <Card>
      <View style={styles.inner}>
        <View style={styles.leftColumn}>
          {tweet.user.profileImageUrl ? (
            <Avatar
              rounded
              //containerStyle={styles.avatar}
              overlayContainerStyle={styles.avatar}
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
        </View>
      </View>
    </Card>
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
    flexDirection: "row"
  },
  userName: {
    fontWeight: "bold",
  },
  screenName: {
    color: "grey",
    fontSize: 10,
  },
  thumbnailsContainer: {
    height: 130,
    width: "100%",
    flexDirection: "row",
  },
  thumbnailsColumn: {
    flex: 1,
  },
  thumbnailItem: {
    flex: 1,
    resizeMode: "cover",
  },
  emoji: {
    width: 16,
    height: 16,
  },
});
