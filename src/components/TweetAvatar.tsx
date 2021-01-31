import React from "react";
import { Avatar, AvatarProps } from "react-native-elements";

type Props = {
  name: string;
  size?: AvatarProps["size"];
  uri?: string;
};

const TweetAvatarBase: React.FC<Props> = ({ name, size, uri }) => {
  return uri ? (
    <Avatar rounded title={name} size={size} source={{ uri }} />
  ) : null;
};

export const TweetAvatar = React.memo<Props>(TweetAvatarBase, () => true);
