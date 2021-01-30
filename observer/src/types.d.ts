export type WebViewMessageData =
  | {
      type: "state";
      data: TweetDeckState;
    }
  | {
      type: "debug";
      data: string;
    };

export type TweetDeckState = {
  columns: ColumnSection[];
};

export type ColumnSection = {
  id: string;
  items: StreamItem[];
};

export type Notification = Follow | Favorite | Retweet | Mention;
export type StreamItem = Tweet | Gap | Notification | Conversation;

export type Tweet = {
  type: "tweet";
  key: string;
  id: string;
  user: TweetUser;
  retweetUser: RetweetUser | null;
  text: string;
  thumbnailUrls: string[];
  imageUrls: string[];
  quotedTweet: QuotedTweet | null;
  timestamp: Timestamp;
  repliesCount: string;
  retweetsCount: string;
  favoritesCount: string;
};

export type Gap = {
  type: "gap";
  key: string;
};

export type Follow = {
  type: "follow";
  key: string;
  user: TweetUser & { description: string };
  timestamp: Timestamp;
};

export type Favorite = {
  type: "favorite";
  key: string;
  tweet: Tweet;
  timestamp: Timestamp;
};

export type Retweet = {
  type: "retweet";
  key: string;
  tweet: Tweet;
  timestamp: Timestamp;
};

export type Mention = {
  type: "mention";
  key: string;
  tweet: Tweet;
  timestamp: Timestamp;
};

export type Conversation = {
  // TODO: 実装
  type: "conversation";
  key: string;
};

export type Timestamp = {
  time: number;
  displayTime: string;
};

export type QuotedTweet = {
  user: Omit<TweetUser, "profileImageUrl">;
  text: string;
};

export type TweetUser = {
  name: string;
  screenName: string;
  profileImageUrl: string;
  url: string;
};

export type RetweetUser = {
  name: string;
  url: string;
};
