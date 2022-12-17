const members = [
  "cat",
  "dog",
  "fox",
  "raccoon",
  "seal",
  "bambi",
  "bear",
  "lion",
  "panda",
  "elephant",
  "penguin",
  "wolf",
];

chrome.runtime.onMessage.addListener((message) => {
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

      const imgs = item.querySelectorAll(".c-base_icon");
      imgs.forEach((imgElem) => {
        imgElem.src = chrome.runtime.getURL(`images/${replaceName}.svg`);
        imgElem.srcset = chrome.runtime.getURL(`images/${replaceName}.svg`);
      });
    });
  }

  const blur = (list) => {
    const blurCSS = "-ms-filter: blur(4px); filter: blur(4px);"
    list.forEach((item) => {
      const nameElem = item.querySelector(".c-message__sender_button");
      if (nameElem == null) {
        return;
      }
      nameElem.style.cssText = blurCSS;

      const imgs = item.querySelectorAll(".c-base_icon");
      imgs.forEach((imgElem) => {
        imgElem.style.cssText = blurCSS;
      });
    });
  };

  const findLoop = (message) => {
      const list = document.querySelectorAll(".c-message_kit__message");
      if (list.length > 0) {
          message === "triggered" ? mask(list) : blur(list);
          return;
      } else {
          setTimeout(() => {
              if (timeoutMs && Date.now() - startTimeInMs > timeoutMs) return;
              findLoop();
          }, intervalMs);
      }
  }

  findLoop(message);
});