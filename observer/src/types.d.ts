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
export type StreamItem = Tweet | Gap | Notification;

export type Tweet = {
  type: "tweet";
  id: string;
  key: string;
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
};

export type Follow = {
  type: "follow";
  user: TweetUser & { description: string };
  timestamp: Timestamp;
};

export type Favorite = {
  type: "favorite";
  tweet: Tweet;
  timestamp: Timestamp;
};

export type Retweet = {
  type: "retweet";
  tweet: Tweet;
  timestamp: Timestamp;
};

export type Mention = {
  type: "mention";
  tweet: Tweet;
  timestamp: Timestamp;
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
