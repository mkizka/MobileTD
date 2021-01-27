import React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import { Image } from "react-native-elements";

type Props = {
  urls: string[];
  setImageIndex: (index: number) => void;
  openModal: () => void;
};

const TweetMediaBase: React.FC<Props> = ({
  urls,
  setImageIndex,
  openModal,
}) => {
  const ThumbnailImage: React.FC<{ index: number }> = ({ index }) => {
    const handlePress = () => {
      setImageIndex(index);
      openModal();
    };
    return (
      <TouchableHighlight onPress={handlePress} style={{ flex: 1 }}>
        <Image
          source={{ uri: urls[index] }}
          containerStyle={styles.thumbnailItem}
        />
      </TouchableHighlight>
    );
  };
  return urls.length > 0 ? (
    <View style={styles.thumbnailsContainer}>
      <View style={styles.thumbnailsColumn}>
        <ThumbnailImage index={0} />
        {urls.length == 4 && (
          // 4画像時の3枚目は1列目に移動するため
          <ThumbnailImage index={2} />
        )}
      </View>
      {urls.length >= 2 && (
        <View style={styles.thumbnailsColumn}>
          {/* 2枚、3枚、4枚のときの画像インデックスの組み合わせ */}
          {[[1], [1, 2], [1, 3]][urls.length - 2].map((index) => (
            <ThumbnailImage key={index} index={index} />
          ))}
        </View>
      )}
    </View>
  ) : null;
};

export const TweetMedia = React.memo<Props>(TweetMediaBase, () => true);

const styles = StyleSheet.create({
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
});
