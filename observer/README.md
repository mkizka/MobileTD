# observer

```console
yarn userscript
```

```js
// ==UserScript==
// @name         MobileTD-dev
// @match        https://tweetdeck.twitter.com
// @require      file:///...MobileTD/observer/dist/userscript.js
// ==/UserScript==

(function () {
  console.log("MobileTD-dev loaded");
})();
```
