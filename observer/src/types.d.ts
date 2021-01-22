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
  thumbnailUrls: string[]
  imageUrls: string[]
  repliesCount: string;
  retweetsCount: string;
  favoritesCount: string;
};

export type TweetUser = {
  name: string;
  screenName: string;
  profileImageUrl: string;
  url: string;
};
