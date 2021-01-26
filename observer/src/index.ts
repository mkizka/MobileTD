import { appColumnsObserver, chirpContainerObserver } from "./observers";
import { notifyTweetDeckState, requestScrollToBottom } from "./state";

const isMobile = "ReactNativeWebView" in window;

function logging(message: any) {
  if (isMobile) {
    window.ReactNativeWebView.postMessage(
      JSON.stringify({ type: "debug", data: message })
    );
  } else {
    console.log(message);
  }
}

const productionCSS = `
.media-item,
.media-image {
  background-image: none !important;
}
`;

const MTD = {
  notifyTweetDeckState,
  requestScrollToBottom,
  logging,
};

function setStyleAndObservers() {
  window.MTD = MTD;
  // WebView全体を非表示に
  if (isMobile) {
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerText = productionCSS;
    document.head.appendChild(style);
  }
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
}

const initInterval = setInterval(() => {
  const drawerOpenButton = document.querySelector(
    "button[data-drawer=compose]"
  );
  if (drawerOpenButton) {
    try {
      if (!("MTD" in window)) {
        logging("observers loaded");
        setStyleAndObservers();
      }
    } catch (e) {
      alert(e);
    }
    clearInterval(initInterval);
  }
}, 100);
