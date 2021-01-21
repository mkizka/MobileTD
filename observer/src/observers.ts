import { notifyTweetDeckState } from "./state";

export const chirpContainerObserver = new MutationObserver((r) => {
  notifyTweetDeckState();
});

export const appColumnsObserver = new MutationObserver((records) => {
  records.forEach((record) => {
    // カラム追加時に新規に監視を開始
    record.addedNodes.forEach((column) => {
      const chirpContainer = (column as HTMLElement).querySelector(
        ".js-chirp-container"
      )!;
      chirpContainerObserver.observe(chirpContainer, { childList: true });
    });
  });
});
