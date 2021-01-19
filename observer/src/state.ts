import { TweetDeckState, TweetArticle, TweetUser } from "./types";

export function createTweetDeckState(sections: HTMLElement[]): TweetDeckState {
  return { columns: sections.map((section) => createColumnSection(section)) };
}

function createColumnSection(section: HTMLElement) {
  // TODO: DMのカラムかどうか判別する処理
  const tweetItems = section.querySelectorAll<HTMLElement>(
    ".js-stream-item[data-drag-type=tweet]"
  );
  return {
    columnId: section.dataset.column!,
    tweets: [...tweetItems].map((article) => createTweetArticle(article)),
  };
}

function createTweetArticle(artice: HTMLElement): TweetArticle {
  return {
    user: createTweetUser(
      artice.querySelector<HTMLElement>(".js-tweet-header")!
    ),
    text: text(artice, ".js-tweet-text"),
    repliesCount: count(artice, ".js-reply-count"),
    retweetsCount: count(artice, ".js-retweet-count"),
    favoritesCount: count(artice, ".js-like-count"),
  };
}

function createTweetUser(header: HTMLElement): TweetUser {
  return {
    name: text(header, ".fullname"),
    screenName: text(header, ".username"),
  };
}

function text(el: HTMLElement, query: string, _default: string = ""): string {
  return el.querySelector(query)!.textContent || _default;
}

function count(el: HTMLElement, query: string, _default: number = 0): number {
  return parseInt(text(el, query)) || _default;
}
