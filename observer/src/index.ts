import { createTweetDeckState } from "./state";

const columnObserver = new MutationObserver((records) => {
  // ツイートリストを通知
  records.forEach((record) => {
    const columns = (record.target as HTMLElement).querySelectorAll<HTMLElement>(
      ".js-column"
    );
    const message = JSON.stringify(createTweetDeckState([...columns]));
    window.ReactNativeWebView.postMessage(message);
  });
});

const containerObserver = new MutationObserver((records) => {
  records.forEach((record) => {
    // カラム追加時に新規に監視を開始
    record.addedNodes.forEach((column) => {
      columnObserver.observe(column, { childList: true });
    });
  });
});
