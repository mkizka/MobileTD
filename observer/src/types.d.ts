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
  time: number;
  displayTime: string;
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
  time: number;
  displayTime: string;
};

export type Favorite = {
  type: "favorite";
  tweet: Tweet;
  time: number;
  displayTime: string;
};

export type Retweet = {
  type: "retweet";
  tweet: Tweet;
  time: number;
  displayTime: string;
};

export type Mention = {
  type: "mention";
  tweet: Tweet;
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
