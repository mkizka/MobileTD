import React from "react";
import { Avatar } from "react-native-elements";
import { ActivityIndicator } from "react-native";

import { TweetUser } from "../../observer";

type Props = {
  user: TweetUser;
};

const TweetAvatarBase: React.FC<Props> = ({ user }) => {
  return user.profileImageUrl ? (
    <Avatar
      rounded
      //renderPlaceholderContent={<ActivityIndicator />}
      title={user.name}
      source={{ uri: user.profileImageUrl }}
    />
  ) : null;
};

export const TweetAvatar = React.memo<Props>(TweetAvatarBase, () => true);
