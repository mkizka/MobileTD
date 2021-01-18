alert("bar");
(window as any).observer = new MutationObserver(() => {
  console.log("foo");
});
