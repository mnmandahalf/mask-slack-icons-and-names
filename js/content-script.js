const members = [
  "cat",
  "dog",
  "fox",
  "raccoon",
  "seal"
];

chrome.runtime.onMessage.addListener(() => {
  const startTimeInMs = Date.now();
  const timeoutMs = 10000;
  const intervalMs = 1000;

  const mask = (list) => {
    const replaceNames = [...members];
    const mem = {};
    list.forEach((item) => {
      const nameElem = item.querySelector(".c-message__sender_button");
      if (nameElem == null) {
        return;
      }

      let replaceName;
      const name = nameElem.textContent;
      if(mem[name] != null) {
        replaceName = mem[name];
      } else {
        replaceName = replaceNames.pop();
        mem[name] = replaceName;
      }
      nameElem.textContent = replaceName;

      const imgElem = item.querySelector("img");
      imgElem.src = chrome.runtime.getURL(`images/${replaceName}.svg`);
      imgElem.srcset = chrome.runtime.getURL(`images/${replaceName}.svg`);
    });
  };

  const findLoop = () => {
      const list = document.querySelectorAll(".c-message_kit__message");
      if (list.length > 0) {
          mask(list);
          return;
      } else {
          setTimeout(() => {
              if (timeoutMs && Date.now() - startTimeInMs > timeoutMs) return;
              findLoop();
          }, intervalMs);
      }
  }

  findLoop();
});