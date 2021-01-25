export type TweetDeckState = {
  columns: ColumnSection[];
};

export type ColumnSection = {
  id: string;
  tweets: TweetArticle[];
};

export type TweetArticle = {
  id: string
  user: TweetUser;
  text: string;
  thumbnailUrls: string[];
  imageUrls: string[];
  quotedTweet: QuotedTweet | null;
  repliesCount: string;
  retweetsCount: string;
  favoritesCount: string;
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
