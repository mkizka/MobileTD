import { appColumnsObserver, chirpContainerObserver } from "./observers";
import { notifyTweetDeckState } from "./state";

if (!("ReactNativeWebView" in window)) {
  console.log("userscript.js loaded");
}

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
