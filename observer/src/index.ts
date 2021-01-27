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

const css = `
.media-item,
.media-image {
  background-image: none !important;
}
.mtd-overlay {
  z-index: 10000;
  background-color: rgba(1,1,1,0.7);
  width: 100vw;
  height: 100vh;
  position: fixed;
}
.mtd-loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  left: 0;
  bottom: 0;
  margin: auto;
}
`;

const loadingOverlayHTML = `
<div class="mtd-overlay">
  <img
    class="mtd-loading"
    src="https://abs.twimg.com/a/1460504487/img/t1/spinner-rosetta-gray-32x32.gif"
  />
</div>
`;

const MTD = {
  notifyTweetDeckState,
  requestScrollToBottom,
  logging,
};

function setStyleAndObservers() {
  window.MTD = MTD;
  // WebView全体を非表示にしてオーバーレイ追加
  if (isMobile) {
    const style = document.createElement("style");
    style.setAttribute("type", "text/css");
    style.innerText = css;
    document.head.appendChild(style);
    document.body.insertAdjacentHTML("beforeend", loadingOverlayHTML);
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
