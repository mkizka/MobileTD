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
  repliesCount: number;
  retweetsCount: number;
  favoritesCount: number;
};
export type TweetUser = {
  name: string;
  screenName: string;
};