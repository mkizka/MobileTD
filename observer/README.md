# observer

```console
yarn dev
```

```js
// ==UserScript==
// @name         MobileTD-dev
// @match        https://tweetdeck.twitter.com
// @require      file:///...MobileTD/observer/dist/dev.js
// ==/UserScript==

(function() {
    console.log("MobileTD-dev loaded")
})();
```
