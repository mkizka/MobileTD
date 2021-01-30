import {
  ColumnSection,
  Conversation,
  Follow,
  Gap,
  QuotedTweet,
  RetweetUser,
  Timestamp,
  Tweet,
  TweetDeckState,
  TweetUser,
  WebViewMessageData,
} from "./types";

function requestScroll(columnId: string, pseudo: string) {
  const query = `.js-column[data-column=${columnId}] .js-stream-item:${pseudo}`;
  document.querySelector<HTMLElement>(query)!.scrollIntoView();
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
        return createGap(article);
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
    text: article.querySelector<HTMLElement>(".js-tweet-text")!.innerHTML,
    thumbnailUrls: thumbnailUrls,
    imageUrls: thumbnailUrls.map((url) => url.split("?")[0]),
    quotedTweet: quoteDetail && createQuotedTweet(quoteDetail),
    timestamp: createTimestamp(article),
    repliesCount: article.querySelector(".js-reply-count")!.textContent!,
    retweetsCount: article.querySelector(".js-retweet-count")!.textContent!,
    favoritesCount: article.querySelector(".js-like-count")!.textContent!,
  };
}

function createGap(element: HTMLElement): Gap {
  return {
    type: "gap",
    key: element.dataset.key!,
  };
}

function createFollow(element: HTMLElement): Follow {
  return {
    type: "follow",
    key: element.dataset.key!,
    user: {
      ...createTweetUser(element),
      description: element.querySelector(".account-bio")!.textContent!,
    },
    timestamp: createTimestamp(element),
  };
}

function createConversation(element: HTMLElement): Conversation {
  return {
    type: "conversation",
    key: element.dataset.key!,
  };
}

function createTimestamp(element: HTMLElement): Timestamp {
  return {
    time: parseInt(
      element.querySelector<HTMLElement>(".js-timestamp")!.dataset.time!
    ),
    displayTime: element.querySelector(".js-timestamp *")!.textContent!,
  };
}

function createQuotedTweet(quote: HTMLElement): QuotedTweet {
  return {
    user: createTweetUser(quote.querySelector<HTMLElement>(".tweet-header")!),
    text: quote.querySelector<HTMLElement>(".js-quoted-tweet-text")!.innerHTML,
  };
}

function createTweetUser(header: HTMLElement): TweetUser {
  return {
    name: header.querySelector(".fullname")!.textContent!,
    screenName: header.querySelector(".username")!.textContent!,
    profileImageUrl: header.querySelector<HTMLImageElement>(".tweet-avatar")
      ?.src!,
    url: header.querySelector<HTMLAnchorElement>(".account-link")!.href!,
  };
}

function createRetweetUser(context: HTMLElement): RetweetUser {
  return {
    name: context.querySelector("a[rel=user]")!.textContent!,
    url: context.querySelector<HTMLAnchorElement>("a[rel=user]")!.href,
  };
}
