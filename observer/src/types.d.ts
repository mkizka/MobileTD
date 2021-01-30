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

export type StreamItem = Tweet | Gap;

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
