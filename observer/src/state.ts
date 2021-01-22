import { TweetDeckState, TweetArticle, TweetUser } from "./types";

export function notifyTweetDeckState() {
  const columns = document.querySelectorAll<HTMLElement>(".js-column");
  const tweetDeckState = createTweetDeckState(Array.from(columns));
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(tweetDeckState));
  } else {
    console.log(tweetDeckState);
  }
}

function createTweetDeckState(sections: HTMLElement[]): TweetDeckState {
  return { columns: sections.map((section) => createColumnSection(section)) };
}

function createColumnSection(section: HTMLElement) {
  // TODO: DMのカラムかどうか判別する処理
  const tweetItems = section.querySelectorAll<HTMLElement>(
    ".js-stream-item[data-drag-type=tweet]"
  );
  return {
    columnId: section.dataset.column!,
    tweets: Array.from(tweetItems).map((article) =>
      createTweetArticle(article)
    ),
  };
}

function createTweetArticle(artice: HTMLElement): TweetArticle {
  return {
    user: createTweetUser(
      artice.querySelector<HTMLElement>(".js-tweet-header")!
    ),
    text: html(artice, ".js-tweet-text"),
    repliesCount: text(artice, ".js-reply-count"),
    retweetsCount: text(artice, ".js-retweet-count"),
    favoritesCount: text(artice, ".js-like-count"),
  };
}

function createTweetUser(header: HTMLElement): TweetUser {
  return {
    name: text(header, ".fullname"),
    screenName: text(header, ".username"),
    profileImageUrl: src(header, ".tweet-avatar"),
    url: href(header, ".account-link")
  };
}

function text(el: HTMLElement, query: string, _default: string = ""): string {
  return el.querySelector<HTMLElement>(query)!.textContent || _default;
}

function src(el: HTMLElement, query: string, _default: string = ""): string {
  // 画像URLは非同期読み込みのため?で呼び出し
  return el.querySelector<HTMLImageElement>(query)?.src || _default;
}

function href(el: HTMLElement, query: string, _default: string = ""): string {
  return el.querySelector<HTMLAnchorElement>(query)!.href || _default;
}

function html(el: HTMLElement, query: string, _default: string = ""): string {
  return el.querySelector<HTMLElement>(query)!.innerHTML || _default;
}
