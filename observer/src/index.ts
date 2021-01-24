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
      // WebView全体を非表示に
      const style = document.createElement("style");
      style.setAttribute("type", "text/css");
      style.innerText = `
      body {
        display: none !important
      }
      .media-item,
      .media-image {
        background-image: none !important;
      }
      `;
      document.head.appendChild(style);
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
