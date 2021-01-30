import {
  WebViewMessageData,
  TweetDeckState,
  Tweet,
  TweetUser,
  QuotedTweet,
  RetweetUser,
  ColumnSection,
  Timestamp,
  Follow,
  Gap,
  Conversation,
} from "./types";

function requestScroll(columnId: string, pseudo: string) {
  document
    .querySelector<HTMLElement>(
      `.js-column[data-column=${columnId}] .js-stream-item:last-child`
    )!
    .scrollIntoView();
}

export function requestScrollToTop(columnId: string) {
  requestScroll(columnId, "first-child");
}

export function requestScrollToBottom(columnId: string) {
  requestScroll(columnId, "last-child");
}

export function notifyTweetDeckState() {
  const columns = document.querySelectorAll<HTMLElement>(".js-column");
  const tweetDeckState = createTweetDeckState(Array.from(columns));
  if (window.ReactNativeWebView) {
    const message: WebViewMessageData = {
      type: "state",
      data: tweetDeckState,
    };
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  } else {
    console.log(tweetDeckState);
  }
}

function createTweetDeckState(sections: HTMLElement[]): TweetDeckState {
  return { columns: sections.map((section) => createColumnSection(section)) };
}

function createColumnSection(section: HTMLElement): ColumnSection {
  const streamItems = section.querySelectorAll<HTMLElement>(".js-stream-item");
  return {
    id: section.dataset.column!,
    items: Array.from(streamItems).map((article) => {
      const key = article.dataset.key || "";
      if (key.startsWith("gap")) {
        return createGap();
      } else if (key.startsWith("follow")) {
        return createFollow(article);
      } else if (key.startsWith("conversation")) {
        return createConversation(article);
      } else {
        return createTweet(article);
      }
    }),
  };
}

function createTweet(article: HTMLElement): Tweet {
  const mediaLinks = article.querySelectorAll<HTMLElement>(
    ".js-media-image-link"
  );
  const thumbnailUrls = Array.from(mediaLinks).map((mediaLink) => {
    return mediaLink.style.backgroundImage.split('"')[1];
  });
  const quoteDetail = article.querySelector<HTMLElement>(".js-quote-detail");
  const tweetContext = article.querySelector<HTMLElement>(".tweet-context");
  return {
    type: "tweet",
    id: article.dataset.tweetId!,
    key: article.dataset.key!,
    user: createTweetUser(
      article.querySelector<HTMLElement>(".js-tweet-header")!
    ),
    retweetUser: tweetContext && createRetweetUser(tweetContext),
    text: html(article, ".js-tweet-text"),
    thumbnailUrls: thumbnailUrls,
    imageUrls: thumbnailUrls.map((url) => url.split("?")[0]),
    quotedTweet: quoteDetail && createQuotedTweet(quoteDetail),
    timestamp: createTimestamp(article),
    repliesCount: text(article, ".js-reply-count"),
    retweetsCount: text(article, ".js-retweet-count"),
    favoritesCount: text(article, ".js-like-count"),
  };
}

function createGap(): Gap {
  return { type: "gap" };
}

function createFollow(element: HTMLElement): Follow {
  return {
    type: "follow",
    user: {
      ...createTweetUser(element),
      description: text(element, ".account-bio"),
    },
    timestamp: createTimestamp(element),
  };
}

function createConversation(element: HTMLElement): Conversation {
  return { type: "conversation" };
}

function createTimestamp(element: HTMLElement): Timestamp {
  return {
    time: parseInt(data(element, ".js-timestamp", "time")),
    displayTime: text(element, ".js-timestamp *"),
  };
}

function createQuotedTweet(quote: HTMLElement): QuotedTweet {
  return {
    user: createTweetUser(quote.querySelector<HTMLElement>(".tweet-header")!),
    text: html(quote, ".js-quoted-tweet-text"),
  };
}

function createTweetUser(header: HTMLElement): TweetUser {
  return {
    name: text(header, ".fullname"),
    screenName: text(header, ".username"),
    profileImageUrl: src(header, ".tweet-avatar"),
    url: href(header, ".account-link"),
  };
}

function createRetweetUser(context: HTMLElement): RetweetUser {
  return {
    name: text(context, "a[rel=user]"),
    url: href(context, "a[rel=user]"),
  };
}

function text(el: HTMLElement, query: string, _default: string = ""): string {
  return el.querySelector<HTMLElement>(query)!.textContent || _default;
}

function src(el: HTMLElement, query: string, _default: string = ""): string {
  // 画像URLは非同期読み込みのため,引用ツイートに画像がないため?で呼び出し
  return el.querySelector<HTMLImageElement>(query)?.src || _default;
}

function href(el: HTMLElement, query: string, _default: string = ""): string {
  return el.querySelector<HTMLAnchorElement>(query)!.href || _default;
}

function data(
  el: HTMLElement,
  query: string,
  key: string,
  _default: string = ""
): string {
  return el.querySelector<HTMLElement>(query)!.dataset[key] || _default;
}

function html(el: HTMLElement, query: string, _default: string = ""): string {
  return el.querySelector<HTMLElement>(query)!.innerHTML || _default;
}
