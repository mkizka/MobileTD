export type TweetDeckState = {
  columns: ColumnSection[];
};

export type ColumnSection = {
  columnId: string;
  tweets: TweetArticle[];
};

export type TweetArticle = {
  user: TweetUser;
  text: string;
  repliesCount: string;
  retweetsCount: string;
  favoritesCount: string;
};
export type TweetUser = {
  name: string;
  screenName: string;
};
