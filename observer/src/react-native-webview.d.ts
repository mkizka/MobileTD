interface Window {
  MTD: Record<string, Function>
  ReactNativeWebView: {
    postMessage: (message: string) => void;
  };
}
