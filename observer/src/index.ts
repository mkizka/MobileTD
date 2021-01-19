import { createTweetDeckState } from "./state";

function notifyTweetDeckState() {
  const columns = document.querySelectorAll<HTMLElement>(".js-column");
  const message = JSON.stringify(createTweetDeckState(Array.from(columns)));
  window.ReactNativeWebView.postMessage(message);
}

const chirpContainerObserver = new MutationObserver((r) => {
  notifyTweetDeckState();
});

const appColumnsObserver = new MutationObserver((records) => {
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

const initInterval = setInterval(() => {
  const drawerOpenButton = document.querySelector(
    "button[data-drawer=compose]"
  );
  if (drawerOpenButton) {
    try {
      // 初期状態を通知
      notifyTweetDeckState();
      // 全カラムを監視開始
      document
        .querySelectorAll(".js-chirp-container")
        .forEach((chirpContainer) =>
          chirpContainerObserver.observe(chirpContainer, { childList: true })
        );
      // カラム追加を監視開始
      appColumnsObserver.observe(document.querySelector(".js-app-columns")!, {
        childList: true,
      });
    } catch (e) {
      alert(e);
    }
    clearInterval(initInterval);
  }
}, 100);
